export type TransferUrgency = "routine" | "urgent" | "emergency";

export type TransferStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "receiving_hospital_requested"
  | "receiving_hospital_accepted"
  | "ambulance_search"
  | "ambulance_assigned"
  | "ambulance_en_route_to_pickup"
  | "patient_picked_up"
  | "in_transit"
  | "arrived"
  | "handed_over"
  | "completed"
  | "rejected"
  | "cancelled"
  | "delayed"
  | "transfer_failed";

export type PatientGender = "male" | "female" | "other";

export type AmbulanceType = "basic" | "advanced" | "critical_care";

export type MedicalSupport =
  "doctor" | "nurse" | "oxygen" | "cardiac_monitoring" | "critical_care";

export type TransferPatient = {
  name: string;
  age: number;
  gender: PatientGender;
};

export type MedicalInformation = {
  primaryCondition: string;
  currentCondition: string;
};

export type AmbulanceRequirements = {
  type: AmbulanceType;
  oxygenRequired: boolean;
  monitoringRequired: boolean;
};

export type TransferRequest = {
  id: string;

  patient: TransferPatient;

  medical: MedicalInformation;

  urgency: TransferUrgency;

  receivingHospitalId: string;

  medicalSupport: MedicalSupport[];

  ambulance: AmbulanceRequirements;

  status: TransferStatus;

  createdAt: string;
  updatedAt: string;
};
export type TransferEventType =
  | "created"
  | "submitted"
  | "review_started"
  | "receiving_hospital_requested"
  | "receiving_hospital_accepted"
  | "ambulance_search_started"
  | "ambulance_assigned"
  | "ambulance_departed"
  | "patient_picked_up"
  | "arrived_at_destination"
  | "patient_handed_over"
  | "completed"
  | "rejected"
  | "cancelled"
  | "delayed"
  | "transfer_failed";

export type TransferEvent = {
  id: string;
  transferId: string;
  type: TransferEventType;
  note?: string;
  createdAt: string;
};
