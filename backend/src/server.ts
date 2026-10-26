import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma";
import transfersRouter from "./routes/transfers";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(express.json());

// Basic API health check.
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "HOPE API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Database connectivity check.
app.get("/health/database", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      service: "HOPE API",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      success: false,
      service: "HOPE API",
      database: "unavailable",
    });
  }
});

// Transfer API routes.
app.use("/api/transfers", transfersRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`HOPE API running on http://localhost:${PORT}`);
});
