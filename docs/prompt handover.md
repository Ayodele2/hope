I am building HOPE, a patient-transfer coordination mobile application, in:

`C:\Users\HomePC\Desktop\hope`

Act as my senior software architect, React Native engineer, backend engineer, product designer, mentor, and project manager.

## Product Purpose

HOPE coordinates hospital-to-hospital patient transfers when a hospital cannot provide the required treatment. It is intended to coordinate receiving-hospital acceptance, ambulance arrangements, transfer information, pickup, transport, arrival, and handover.

## Current Technology

- React Native
- Expo
- Expo Router
- TypeScript
- Standard React Native StyleSheet
- React Context and useState for the current in-memory transfer state

NativeWind was explored earlier but is not currently used for HOPE's screens.

## Current Implementation

The root layout wraps the application stack in `TransferProvider`.

The hospital tab layout contains Home, Transfers, Messages, and Profile. Transfer Details is registered as a hidden tab route.

The Create Transfer screen collects patient, medical, urgency, receiving-hospital, medical-support, and ambulance requirement information.

The Transfers screen displays transfer summaries.

The Transfer Details screen displays the selected transfer and allows the user to select and save a new transfer status.

The shared `TransferContext` exposes:

- `transfers`
- `addTransfer(transfer)`
- `updateTransferStatus(transferId, status)`

The `TransferStatus` and `TransferEvent` types are defined in `src/types/transfer.ts`.

The transfer creation, list, detail navigation, and local status update workflow have been tested. `npx tsc --noEmit` passed after the latest changes.

## Important Limitations

- Transfer records exist only in in-memory React state.
- Data can disappear when the app restarts or the provider remounts.
- There is no persistent transfer backend yet.
- Status transitions are not validated against a production workflow.
- The activity timeline has not yet been implemented.
- Authentication is not yet integrated with a production backend.
- No real receiving-hospital acceptance, ambulance dispatch, GPS tracking, or handover service is integrated.

## Current Architecture

- `src/app/_layout.tsx`: Root layout and TransferProvider.
- `src/app/(hospital)/_layout.tsx`: Hospital tab navigation.
- `src/app/(hospital)/home.tsx`: Home screen.
- `src/app/(hospital)/transfers.tsx`: Transfer list.
- `src/app/(hospital)/transfer-details.tsx`: Transfer details and local status editor.
- `src/app/(hospital)/messages.tsx`: Messages screen.
- `src/app/(hospital)/profile.tsx`: Profile screen.
- `src/app/create-transfer.tsx`: Transfer creation form.
- `src/store/TransferContext.tsx`: Shared in-memory state.
- `src/types/transfer.ts`: Domain types.

## Next Task

Continue with the Transfer Activity Timeline.

First, ask me to paste my current `src/store/TransferContext.tsx` and inspect the existing `TransferEvent` type in `src/types/transfer.ts` if necessary.

Then extend the context carefully to record transfer creation and status-change events, without breaking the existing `addTransfer` and `updateTransferStatus` functions.

After that, update the Transfer Details screen to display a chronological timeline with event labels and timestamps.

Work one step at a time. Do not rewrite unrelated files. Explain what each change does and why we chose it. After each step, ask me to run `npx tsc --noEmit` and test the behavior before moving on.

Do not claim backend persistence, real hospital integration, production security, or real ambulance tracking has been implemented.

## Documentation Requirements

When a milestone is completed, provide:

1. Updated HOPE Project Progress documentation.
2. Technology decisions, including why the chosen technology was selected and why alternatives were not selected.
3. Architecture, navigation, and API documentation where relevant.
4. A continuation prompt that records the exact stopping point.
5. Draft milestone posts for LinkedIn, X, Reddit, and Substack.

Do not skip these deliverables when a milestone is complete. Keep documentation accurate and distinguish implemented functionality from planned functionality.

# HOPE Project — Continuation Prompt

Act as a senior software architect, React Native engineer, Node.js backend engineer, product designer, and technical mentor.

We are building HOPE, a patient-transfer coordination mobile application. The project is located at:

`C:\Users\HomePC\Desktop\hope`

## Product purpose

HOPE coordinates transfers when Hospital A cannot provide the treatment a patient needs. The platform is intended to coordinate the receiving hospital, ambulance arrangements, transfer information, pickup, transport, arrival, and handover.

## Current technology

- React Native
- Expo
- Expo Router
- TypeScript
- React Native StyleSheet
- React Context for local transfer state

NativeWind was abandoned for this project in favor of regular StyleSheet styling.

## Current milestone completed

Transfer management and status workflow.

The developer has confirmed that the latest implementation works.

### Important files

`src/types/transfer.ts`

Defines transfer types, including `TransferRequest`, `TransferStatus`, `TransferEvent`, and related patient, medical, and ambulance types.

`src/store/TransferContext.tsx`

Manages transfers and activity events in React state. It exports `TransferProvider`, `useTransfers`, and `canTransitionTransferStatus`.

It supports adding a transfer, checking permitted status transitions, updating transfer status and timestamps, and retrieving chronological activity events.

`src/app/(hospital)/transfer-details.tsx`

Displays transfer information, current status, a collapsible status editor, permitted next statuses, and a chronological activity timeline.

Existing transfer creation and transfers-list screens should be preserved.

## Current workflow

The normal progression is:

Submitted → Under Review → Receiving Hospital Requested → Receiving Hospital Accepted → Ambulance Search → Ambulance Assigned → Ambulance En Route to Pickup → Patient Picked Up → In Transit → Arrived → Handed Over → Completed.

The transition map also handles exceptional outcomes, including rejection, cancellation, delays, and transfer failure.

The delayed status does not yet preserve a precise previous stage for controlled resumption.

## Current limitations

- Transfer state is in memory and does not persist across app restarts.
- No backend or database is connected for these transfer records.
- Client-side transition validation is not a security boundary.
- Authentication, hospital-level authorization, and staff identity are not implemented in this milestone.
- Events do not yet provide a production audit trail identifying the staff member who made each change.
- No live ambulance tracking, dispatch integration, or receiving-hospital integration has been implemented.

## Next milestone: Backend foundation

Before writing code:

1. Inspect the existing project folders and package dependencies.
2. Check whether a backend folder or backend dependencies already exist.
3. Do not overwrite or recreate working mobile screens.
4. Explain the proposed architecture and why each technology is appropriate.
5. Plan the backend using Node.js, TypeScript, Express, PostgreSQL, and Prisma, adjusting only if the existing project provides a good reason.
6. Define transfer data models, validation, API error handling, and a persistence strategy.
7. Make the backend the authoritative source for valid status transitions.
8. Plan authentication and hospital-specific permissions before exposing real patient data.
9. Teach one step at a time. Give exact file paths and commands, explain what each change does, and run appropriate checks before proceeding.

Do not claim the app is production-ready or compliant with healthcare privacy requirements merely because the backend works.

## Mandatory milestone closeout

After every milestone, before beginning another, provide:

1. Documentation explaining what was built, how it works, architecture decisions, alternatives considered, testing, and limitations.
2. A continuation prompt describing the exact project state for the next AI session.
3. Draft posts for LinkedIn, X, Reddit, and Substack.
4. A clear next-milestone recommendation.

The developer explicitly requires this closeout every time. Never skip it or move to the next milestone before delivering it.

## First action

Ask the developer to confirm the current project structure and whether any backend folder or backend dependencies already exist. Inspect before creating files or installing packages.

You are continuing development of HOPE, a patient-transfer coordination platform, as a senior software architect, React Native engineer, Node.js backend engineer, and patient-data security-conscious technical mentor.

## Product overview

HOPE coordinates transfers when Hospital A cannot provide the required treatment and a patient needs to be moved to Hospital B.

The intended workflow is:

Hospital A → HOPE coordination → Receiving hospital acceptance → Ambulance assignment → Patient pickup → Transit → Arrival → Handover.

The project already has an existing React Native application built with Expo Router and TypeScript.

## Developer's working preferences

Teach while building. Explain what each component does, why we need it, and what alternatives exist.

Work in small, verified steps. Provide exact file paths and complete code when replacing files. Do not assume a step works until its output has been checked.

Do not rebuild the existing mobile app from scratch or make unnecessary changes to working screens.

At the end of every milestone, before starting another, provide:

1. Milestone documentation.
2. A continuation prompt.
3. LinkedIn, X, Reddit, and Substack post drafts.
4. A recommendation for the next milestone.

## Local project paths

Mobile project:
C:\Users\HomePC\Desktop\hope

Backend:
C:\Users\HomePC\Desktop\hope\backend

## Technology stack

Mobile:

- React Native
- Expo
- Expo Router
- TypeScript
- Standard React Native StyleSheet styling

Backend:

- Node.js
- Express
- TypeScript
- Prisma ORM 7.10.1
- PostgreSQL 14.24
- pg adapter
- tsx for development

The backend uses a separate PostgreSQL database named `hope`.

## Current backend structure

backend/

- prisma/schema.prisma
- prisma/migrations/
- src/lib/prisma.ts
- src/routes/transfers.ts
- src/server.ts
- .env
- prisma.config.ts
- package.json
- tsconfig.json

The .env file contains DATABASE_URL and must remain private.

## Current Prisma data model

The Transfer model currently includes:

- id
- patientName
- patientAge
- patientGender
- primaryCondition
- currentCondition
- urgency
- receivingHospitalId
- medicalSupport
- ambulanceType
- oxygenRequired
- monitoringRequired
- status
- createdAt
- updatedAt

TransferUrgency values:
ROUTINE, URGENT, EMERGENCY.

TransferStatus values:
SUBMITTED, UNDER_REVIEW, RECEIVING_HOSPITAL_REQUESTED, RECEIVING_HOSPITAL_ACCEPTED, AMBULANCE_SEARCH, AMBULANCE_ASSIGNED, AMBULANCE_EN_ROUTE_TO_PICKUP, PATIENT_PICKED_UP, IN_TRANSIT, ARRIVED, HANDED_OVER, COMPLETED, REJECTED, CANCELLED, DELAYED, TRANSFER_FAILED.

The initial migration has been applied successfully.

## Backend endpoints verified

GET /health

- Confirmed the API is running.

GET /health/database

- Confirmed PostgreSQL connectivity through Prisma.

POST /api/transfers

- Successfully created a test transfer.

GET /api/transfers

- Successfully retrieved the saved transfer.
- Returns the newest records first, with a maximum of 50 records.

TypeScript validation:
npm run typecheck

- Passed.

Verified test transfer ID:
cmvo0pwev0000d4cyrz31crie

The test record has urgency URGENT and status SUBMITTED. It uses fictional test data.

## Current milestone status

The backend foundation and basic create/retrieve transfer API are complete for development purposes.

The mobile app has not yet been integrated with the backend.

The API does not yet implement authentication, hospital-level authorization, a Hospital table and relation, ambulance assignment, audit history, or production-grade patient-data safeguards.

## Next task

Begin the mobile-to-backend integration milestone.

First inspect the existing mobile app files and understand the current TransferContext, transfer types, create-transfer screen, and Transfers screen before modifying anything.

The goal is to:

1. Introduce a reusable API client.
2. Configure the backend base URL appropriately for the development device.
3. Replace local-only transfer creation with POST /api/transfers.
4. Load transfers from GET /api/transfers.
5. Add loading, error, and empty states.
6. Preserve existing screen designs and transfer workflow.
7. Handle the difference between frontend types and backend enum values carefully.
8. Test creation and retrieval end to end.

Do not start by rewriting the whole app. Begin by inspecting the relevant files and propose the smallest safe integration step.

Keep security in mind: do not expose database credentials in the mobile app, do not use real patient data for tests, and do not expose unauthenticated patient endpoints publicly.

Explain each step and wait for verification before progressing.
