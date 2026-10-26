-- CreateEnum
CREATE TYPE "TransferUrgency" AS ENUM ('ROUTINE', 'URGENT', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'RECEIVING_HOSPITAL_REQUESTED', 'RECEIVING_HOSPITAL_ACCEPTED', 'AMBULANCE_SEARCH', 'AMBULANCE_ASSIGNED', 'AMBULANCE_EN_ROUTE_TO_PICKUP', 'PATIENT_PICKED_UP', 'IN_TRANSIT', 'ARRIVED', 'HANDED_OVER', 'COMPLETED', 'REJECTED', 'CANCELLED', 'DELAYED', 'TRANSFER_FAILED');

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientAge" INTEGER NOT NULL,
    "patientGender" TEXT NOT NULL,
    "primaryCondition" TEXT NOT NULL,
    "currentCondition" TEXT NOT NULL,
    "urgency" "TransferUrgency" NOT NULL,
    "receivingHospitalId" TEXT NOT NULL,
    "medicalSupport" TEXT[],
    "ambulanceType" TEXT NOT NULL,
    "oxygenRequired" BOOLEAN NOT NULL DEFAULT false,
    "monitoringRequired" BOOLEAN NOT NULL DEFAULT false,
    "status" "TransferStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transfer_status_idx" ON "Transfer"("status");

-- CreateIndex
CREATE INDEX "Transfer_receivingHospitalId_idx" ON "Transfer"("receivingHospitalId");

-- CreateIndex
CREATE INDEX "Transfer_createdAt_idx" ON "Transfer"("createdAt");
