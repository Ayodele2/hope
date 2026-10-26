import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  TransferEvent,
  TransferRequest,
  TransferStatus,
} from "../types/transfer";

import {
  createTransfer as createTransferApi,
  getTransfers,
  type ApiTransfer,
  type CreateTransferPayload,
} from "../services/transferService";

type TransferContextValue = {
  transfers: TransferRequest[];
  events: TransferEvent[];
  isLoading: boolean;
  error: string | null;
  refreshTransfers: () => Promise<void>;
  addTransfer: (transfer: TransferRequest) => Promise<void>;
  updateTransferStatus: (transferId: string, status: TransferStatus) => void;
  getTransferEvents: (transferId: string) => TransferEvent[];
};

type TransferState = {
  transfers: TransferRequest[];
  events: TransferEvent[];
};

const TransferContext = createContext<TransferContextValue | undefined>(
  undefined,
);

type TransferProviderProps = {
  children: ReactNode;
};

const ALLOWED_STATUS_TRANSITIONS: Record<
  TransferStatus,
  readonly TransferStatus[]
> = {
  draft: ["submitted", "cancelled"],
  submitted: ["under_review", "rejected", "cancelled"],
  under_review: [
    "receiving_hospital_requested",
    "rejected",
    "cancelled",
    "delayed",
    "transfer_failed",
  ],
  receiving_hospital_requested: [
    "receiving_hospital_accepted",
    "rejected",
    "cancelled",
    "delayed",
    "transfer_failed",
  ],
  receiving_hospital_accepted: [
    "ambulance_search",
    "cancelled",
    "delayed",
    "transfer_failed",
  ],
  ambulance_search: [
    "ambulance_assigned",
    "cancelled",
    "delayed",
    "transfer_failed",
  ],
  ambulance_assigned: [
    "ambulance_en_route_to_pickup",
    "cancelled",
    "delayed",
    "transfer_failed",
  ],
  ambulance_en_route_to_pickup: [
    "patient_picked_up",
    "cancelled",
    "delayed",
    "transfer_failed",
  ],
  patient_picked_up: ["in_transit", "delayed", "transfer_failed"],
  in_transit: ["arrived", "delayed", "transfer_failed"],
  arrived: ["handed_over", "transfer_failed"],
  handed_over: ["completed"],
  completed: [],
  rejected: [],
  cancelled: [],
  transfer_failed: [],
  delayed: [
    "under_review",
    "receiving_hospital_requested",
    "receiving_hospital_accepted",
    "ambulance_search",
    "ambulance_assigned",
    "ambulance_en_route_to_pickup",
    "patient_picked_up",
    "in_transit",
    "arrived",
    "handed_over",
    "cancelled",
    "transfer_failed",
  ],
};

export function canTransitionTransferStatus(
  currentStatus: TransferStatus,
  nextStatus: TransferStatus,
): boolean {
  return ALLOWED_STATUS_TRANSITIONS[currentStatus].includes(nextStatus);
}

/**
 * Converts the backend's uppercase enum values into the lowercase
 * statuses used by the mobile application.
 */
function normalizeStatus(status: string): TransferStatus {
  return status.toLowerCase() as TransferStatus;
}

/**
 * Converts a backend record into the shape expected by the existing
 * mobile application.
 *
 * The assertion is temporary until we verify the exact TransferRequest
 * definition and align the API and mobile types.
 */

function mapApiTransfer(record: ApiTransfer): TransferRequest {
  return {
    id: record.id,
    patient: {
      name: record.patientName,
      age: record.patientAge,
      gender: record.patientGender as TransferRequest["patient"]["gender"],
    },
    medical: {
      primaryCondition: record.primaryCondition,
      currentCondition: record.currentCondition,
    },
    urgency: record.urgency.toLowerCase() as TransferRequest["urgency"],
    receivingHospitalId: record.receivingHospitalId,
    medicalSupport: record.medicalSupport as TransferRequest["medicalSupport"],
    ambulance: {
      type: record.ambulanceType as TransferRequest["ambulance"]["type"],
      oxygenRequired: record.oxygenRequired,
      monitoringRequired: record.monitoringRequired,
    },
    status: normalizeStatus(record.status),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

function mapMobileTransfer(transfer: TransferRequest): CreateTransferPayload {
  return {
    patientName: transfer.patient.name,
    patientAge: transfer.patient.age,
    patientGender: transfer.patient.gender,

    primaryCondition: transfer.medical.primaryCondition,
    currentCondition: transfer.medical.currentCondition,

    urgency: transfer.urgency.toUpperCase() as CreateTransferPayload["urgency"],

    receivingHospitalId: transfer.receivingHospitalId,

    medicalSupport: transfer.medicalSupport,

    ambulanceType: transfer.ambulance.type,
    oxygenRequired: transfer.ambulance.oxygenRequired,
    monitoringRequired: transfer.ambulance.monitoringRequired,
  };
}

export function TransferProvider({ children }: TransferProviderProps) {
  const [state, setState] = useState<TransferState>({
    transfers: [],
    events: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTransfers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const records = await getTransfers();
      const mappedTransfers = records.map(mapApiTransfer);

      setState((current) => ({
        ...current,
        transfers: mappedTransfers,
      }));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load transfers from the server.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshTransfers();
  }, [refreshTransfers]);

  const addTransfer = async (transfer: TransferRequest): Promise<void> => {
    setError(null);

    try {
      const payload = mapMobileTransfer(transfer);
      const savedRecord = await createTransferApi(payload);
      const savedTransfer = mapApiTransfer(savedRecord);

      const event: TransferEvent = {
        id: `${savedTransfer.id}-created`,
        transferId: savedTransfer.id,
        type: "created",
        note: "Transfer request created.",
        createdAt: savedRecord.createdAt,
      };

      setState((current) => {
        if (current.transfers.some((item) => item.id === savedTransfer.id)) {
          return current;
        }

        return {
          transfers: [savedTransfer, ...current.transfers],
          events: [event, ...current.events],
        };
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to create the transfer.";

      setError(message);
      throw err;
    }
  };

  const updateTransferStatus = (transferId: string, status: TransferStatus) => {
    const timestamp = new Date().toISOString();

    setState((current) => {
      const transfer = current.transfers.find((item) => item.id === transferId);

      if (!transfer || transfer.status === status) {
        return current;
      }

      if (!canTransitionTransferStatus(transfer.status, status)) {
        return current;
      }

      const updatedTransfer: TransferRequest = {
        ...transfer,
        status,
        updatedAt: timestamp,
      };

      const event: TransferEvent = {
        id: `${transferId}-${Date.now()}`,
        transferId,
        type: "status_changed",
        previousStatus: transfer.status,
        newStatus: status,
        note: `Status changed from ${transfer.status.replace(/_/g, " ")} to ${status.replace(/_/g, " ")}.`,
        createdAt: timestamp,
      };

      return {
        transfers: current.transfers.map((item) =>
          item.id === transferId ? updatedTransfer : item,
        ),
        events: [event, ...current.events],
      };
    });
  };

  const getTransferEvents = (transferId: string) => {
    return state.events
      .filter((event) => event.transferId === transferId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  };

  return (
    <TransferContext.Provider
      value={{
        transfers: state.transfers,
        events: state.events,
        isLoading,
        error,
        refreshTransfers,
        addTransfer,
        updateTransferStatus,
        getTransferEvents,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}

export function useTransfers() {
  const context = useContext(TransferContext);

  if (!context) {
    throw new Error("useTransfers must be used inside TransferProvider");
  }

  return context;
}
