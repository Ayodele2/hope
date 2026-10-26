import { apiRequest } from "./api";

export type CreateTransferPayload = {
  patientName: string;
  patientAge: number;
  patientGender: string;
  primaryCondition: string;
  currentCondition: string;
  urgency: "ROUTINE" | "URGENT" | "EMERGENCY";
  receivingHospitalId: string;
  medicalSupport: string[];
  ambulanceType: string;
  oxygenRequired: boolean;
  monitoringRequired: boolean;
};

export type ApiTransfer = CreateTransferPayload & {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  count?: number;
  data: T;
};

export async function createTransfer(
  payload: CreateTransferPayload,
): Promise<ApiTransfer> {
  const response = await apiRequest<ApiResponse<ApiTransfer>>(
    "/api/transfers",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}

export async function getTransfers(): Promise<ApiTransfer[]> {
  const response =
    await apiRequest<ApiResponse<ApiTransfer[]>>("/api/transfers");

  return response.data;
}
