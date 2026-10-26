# HOPE Architecture

## Overview

HOPE is a patient-transfer coordination platform designed to coordinate transfers between referring hospitals, receiving hospitals, HOPE dispatchers, and ambulance operators.

The initial product architecture is divided into:

- Mobile application
- Backend API
- PostgreSQL database
- Real-time communication layer
- Notification infrastructure

## Current Stage

Milestone 1 establishes the mobile application foundation.

Current technologies:

- React Native
- Expo
- TypeScript
- Expo Router
- React Native StyleSheet

## Planned Architecture

```text
Mobile App
    |
    | REST API
    v
Node.js Backend
    |
    v
PostgreSQL

Real-time communication:
Mobile App <-> Socket.IO <-> Backend

External services will be introduced only when required.
```

## Hospital Application Shell

The hospital mobile experience is organized as a route group:

src/app/(hospital)/

The group currently contains:

- Home
- Transfers
- Messages
- Profile

The application uses bottom tabs for persistent top-level navigation.

The hospital dashboard currently uses temporary mock data.

Real hospital, user and transfer data will be introduced after backend authentication and database integration.

# HOPE Architecture

## Current Application Flow

Hospital staff create a transfer request using the Create Transfer screen.

The form builds a typed `TransferRequest` and adds it to the shared `TransferContext`.

The Transfers screen reads the shared collection and displays the available requests.

When staff select a transfer, the app navigates to the Transfer Details screen using the transfer ID as a route parameter.

The details screen finds the matching transfer in the shared collection and displays its information.

When a status is changed, `updateTransferStatus` updates the matching transfer in React state and refreshes its `updatedAt` timestamp.

## Current Data Flow

Create Transfer Screen
→ TransferContext
→ Transfers Screen
→ Transfer Details Screen
→ Local Status Update
→ Updated Shared State

## Current Data Ownership

`TransferContext` owns the in-memory collection of transfer requests.

`src/types/transfer.ts` defines the shape of transfer requests and their associated status types.

Screens display data and trigger state updates through the shared context.

## Current Limitation

The application currently depends on local in-memory state.

The current architecture does not yet provide durable storage, multi-device synchronization, server-side authorization, or a reliable audit trail.

## Target Production Architecture

Hospital Mobile App
→ Authenticated Backend API
→ Transfer Management Service
→ Persistent Database
→ Activity History and Audit Records

The backend should validate status transitions and permissions rather than trusting a status selected by the mobile client.

Hospital acceptance and ambulance assignment should be represented as explicit operational events with timestamps and responsible actors.

Because HOPE handles sensitive patient information, production implementation must include appropriate access controls, secure transport, data minimization, audit logging, and a privacy/security review appropriate to its deployment jurisdiction.

# HOPE Patient Transfer Coordination Platform

## Milestone: Backend Foundation and Transfer API

### 1. Milestone objective

The objective was to establish a backend foundation for HOPE that can connect the mobile application to a persistent database.

Previously, transfer records were managed locally in the mobile application's state. The backend now provides API endpoints that can create and retrieve transfer records stored in PostgreSQL.

### 2. Technology stack

**Node.js**

Node.js runs the backend JavaScript and TypeScript code outside the browser.

**TypeScript**

TypeScript adds static type checking, helping us identify certain programming mistakes before running the application.

**Express**

Express is the backend web framework. It receives HTTP requests, executes the appropriate logic, and sends responses to clients.

**PostgreSQL**

PostgreSQL is the relational database that stores transfer records beyond the lifetime of an individual mobile application session.

**Prisma ORM**

Prisma provides a typed interface for working with PostgreSQL from TypeScript. It reduces the need to write repetitive SQL queries manually.

**tsx**

tsx runs the TypeScript backend during development and supports automatic restarts when files change.

### 3. Current backend structure

```text
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   └── transfers.ts
│   └── server.ts
├── .env
├── prisma.config.ts
├── package.json
└── tsconfig.json
```

The `.env` file contains the database connection configuration. It must not be committed to a public repository.

### 4. Database design

The initial `Transfer` model contains:

- ID
- Patient name
- Patient age
- Patient gender
- Primary medical condition
- Current condition
- Transfer urgency
- Receiving hospital identifier
- Required medical support
- Ambulance type
- Oxygen requirement
- Monitoring requirement
- Transfer status
- Creation timestamp
- Last-updated timestamp

The database also defines urgency and transfer-status enums.

The initial migration created the `Transfer` and `_prisma_migrations` tables.

### 5. API endpoints implemented

#### GET /health

Purpose: Confirm that the Express API is running.

Verified response: HTTP 200 with a healthy status.

#### GET /health/database

Purpose: Execute a lightweight query through Prisma to verify database connectivity.

Verified response: HTTP 200 with the database reported as connected.

#### POST /api/transfers

Purpose: Accept a transfer request, validate the supplied fields, and create a record in PostgreSQL through Prisma.

Verified response: The API returned success and a generated transfer ID.

#### GET /api/transfers

Purpose: Retrieve saved transfer records, with the newest first and a maximum of 50 records per request.

Verified response: The API returned the previously created test transfer.

### 6. Testing completed

The following tests passed:

1. `npm run typecheck`
2. `GET /health`
3. `GET /health/database`
4. `POST /api/transfers`
5. `GET /api/transfers`

A test transfer was created and subsequently retrieved using its generated ID.

### 7. Why we chose this architecture

We separated the mobile application from the backend instead of putting database operations directly into the mobile app.

This separation provides several benefits:

- The backend can validate incoming requests.
- Database credentials remain on the server instead of inside the mobile application.
- Business rules can be implemented centrally.
- Multiple authorized clients can eventually use the same API.
- Database persistence is independent of the mobile application's in-memory state.

We chose PostgreSQL because HOPE will manage structured relationships between hospitals, transfer requests, ambulance assignments, users, and transfer events.

Prisma provides a typed database interface and migration workflow. Raw SQL remains available for database operations that benefit from it.

Express provides a straightforward way to introduce and organize API routes while the project is still developing.

### 8. Current limitations

This is a development foundation, not a production-ready healthcare backend.

The following work remains:

- Authentication and hospital-level authorization
- Hospital records and actual hospital relationships
- Ambulance records and assignment workflows
- Transfer status-transition rules enforced by the backend
- Activity and audit history
- Input validation refinements
- Pagination and filtering
- Consistent error handling
- Automated tests
- Secure deployment and environment configuration
- Appropriate patient-data protection and retention policies
- Monitoring, backups, and recovery procedures

The current GET endpoint returns patient information without authentication. Do not expose it publicly or use real patient data during development.

The API also does not yet verify that a receiving hospital exists or that the requesting user is authorized to initiate a transfer.

### 9. Next milestone

Connect the existing React Native application to the backend.

The first integration should replace local-only transfer creation with an HTTP request to the API. The Transfers screen should then retrieve records from the backend and handle loading, empty, and error states.

The existing mobile application should be preserved rather than rebuilt.

### 10. Completion criteria

The backend foundation milestone is considered complete for development purposes because the API can connect to PostgreSQL, create a transfer, and retrieve the saved record.

Production readiness has not been established.
