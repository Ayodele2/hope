import { TransferUrgency } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();
// GET /api/transfers
// Retrieve recent transfers saved in PostgreSQL.
router.get("/", async (_req, res) => {
  try {
    const transfers = await prisma.transfer.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return res.status(200).json({
      success: true,
      count: transfers.length,
      data: transfers,
    });
  } catch (error) {
    console.error("Failed to retrieve transfers:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve transfers.",
    });
  }
});

const validUrgencies = Object.values(TransferUrgency);

// POST /api/transfers
// Create and save a new transfer request.
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      patientAge,
      patientGender,
      primaryCondition,
      currentCondition,
      urgency,
      receivingHospitalId,
      medicalSupport,
      ambulanceType,
      oxygenRequired,
      monitoringRequired,
    } = req.body ?? {};

    // Validate required text fields.
    if (
      typeof patientName !== "string" ||
      !patientName.trim() ||
      typeof patientGender !== "string" ||
      !patientGender.trim() ||
      typeof primaryCondition !== "string" ||
      !primaryCondition.trim() ||
      typeof currentCondition !== "string" ||
      !currentCondition.trim() ||
      typeof receivingHospitalId !== "string" ||
      !receivingHospitalId.trim() ||
      typeof ambulanceType !== "string" ||
      !ambulanceType.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required text fields.",
      });
    }

    // Validate age.
    if (!Number.isInteger(patientAge) || patientAge < 0 || patientAge > 120) {
      return res.status(400).json({
        success: false,
        message: "Patient age must be a whole number between 0 and 120.",
      });
    }

    // Validate urgency against the Prisma enum.
    const normalizedUrgency =
      typeof urgency === "string" ? urgency.toUpperCase() : "";

    if (!validUrgencies.includes(normalizedUrgency as TransferUrgency)) {
      return res.status(400).json({
        success: false,
        message: "Urgency must be ROUTINE, URGENT, or EMERGENCY.",
      });
    }

    // Validate medical support options.
    if (
      !Array.isArray(medicalSupport) ||
      !medicalSupport.every(
        (item: unknown) => typeof item === "string" && item.trim().length > 0,
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Medical support must be an array of strings.",
      });
    }

    // Validate optional boolean fields.
    if (
      (oxygenRequired !== undefined && typeof oxygenRequired !== "boolean") ||
      (monitoringRequired !== undefined &&
        typeof monitoringRequired !== "boolean")
    ) {
      return res.status(400).json({
        success: false,
        message: "oxygenRequired and monitoringRequired must be true or false.",
      });
    }

    // Save the transfer in PostgreSQL through Prisma.
    const transfer = await prisma.transfer.create({
      data: {
        patientName: patientName.trim(),
        patientAge,
        patientGender: patientGender.trim(),
        primaryCondition: primaryCondition.trim(),
        currentCondition: currentCondition.trim(),
        urgency: normalizedUrgency as TransferUrgency,
        receivingHospitalId: receivingHospitalId.trim(),
        medicalSupport,
        ambulanceType: ambulanceType.trim(),
        oxygenRequired: oxygenRequired ?? false,
        monitoringRequired: monitoringRequired ?? false,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Transfer created successfully.",
      data: transfer,
    });
  } catch (error) {
    console.error("Failed to create transfer:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create transfer.",
    });
  }
});

export default router;
