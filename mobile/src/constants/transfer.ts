import type { TransferStatus } from "@/types/transfer";

export const TRANSFER_STATUS_LABELS: Record<TransferStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under review",
  receiving_hospital_requested: "Receiving hospital requested",
  receiving_hospital_accepted: "Receiving hospital accepted",
  ambulance_search: "Searching for ambulance",
  ambulance_assigned: "Ambulance assigned",
  ambulance_en_route_to_pickup: "Ambulance en route",
  patient_picked_up: "Patient picked up",
  in_transit: "In transit",
  arrived: "Arrived",
  handed_over: "Handed over",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
  delayed: "Delayed",
  transfer_failed: "Transfer failed",
};

export const ACTIVE_TRANSFER_STATUSES: TransferStatus[] = [
  "submitted",
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
];

export const TERMINAL_TRANSFER_STATUSES: TransferStatus[] = [
  "completed",
  "rejected",
  "cancelled",
  "transfer_failed",
];
