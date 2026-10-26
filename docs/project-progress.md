# HOPE Project Progress

## Milestone 1 — Project Foundation

Status: In progress

### Goals

- Create Expo project
- Configure TypeScript
- Configure Expo Router
- Establish initial source structure
- Establish documentation structure
- Initialize Git
- Verify the application runs

### Completed

- Project initialized
- Expo configured
- TypeScript configured
- Expo Router configured
- Root layout created
- Initial route created
- Source directories created
- Documentation structure created

### Not Yet Implemented

- Authentication
- Backend
- Database
- Hospital dashboard
- Transfers
- Dispatcher workflow
- Ambulance workflow
- Real-time communication
- Notifications

### Next Milestone

Milestone 2 will establish the HOPE welcome and role-selection UX.

This milestone must be confirmed working before proceeding.

# HOPE Project Progress

## Milestone 1 — Project Foundation

Status: Completed

### Completed

- Expo project created
- React Native configured
- TypeScript configured
- Expo Router configured
- React Native StyleSheet selected
- Initial source architecture created
- Documentation structure created
- Git initialized

---

## Milestone 2 — Authentication UX

Status: In progress

### Goals

- Build HOPE welcome screen
- Build role selection
- Build login screen
- Build signup screen
- Establish initial authentication navigation
- Pass selected role through navigation

### Completed

- Welcome screen
- Role selection screen
- Login screen
- Signup screen
- Role parameter navigation
- Frontend-only authentication flow

### Important Limitation

Authentication is currently UI-only.

No credentials are sent to a server.

No user is actually authenticated.

The selected role is only used for navigation and must not be considered a security mechanism.

### Not Yet Implemented

- Backend authentication
- Password hashing
- JWT/session management
- Database users
- Role-based authorization
- Hospital dashboard
- Transfer workflow

### Next Milestone

Hospital application shell.

## Milestone 3 — Hospital Application Shell

Status: In progress

### Goals

- Create hospital route group
- Create hospital tab navigation
- Create Home screen
- Create Transfers screen
- Create Messages screen
- Create Profile screen
- Establish temporary hospital navigation after frontend login

### Completed

- Hospital route group created
- Bottom tab navigation created
- Hospital Home created
- Transfers screen created
- Messages screen created
- Profile screen created
- Temporary frontend login-to-hospital navigation established

### Important Limitation

The hospital application currently uses temporary mock data.

Authentication is still frontend-only.

No backend or database is connected.

### Next Milestone

Create Transfer Request UI.

## Milestone 5 — Transfer Domain Model

Status: In progress

### Goal

Define the core transfer domain before implementing the backend.

### Completed

Created the TransferRequest type.

Created transfer status definitions.

Created active and terminal status groups.

Created temporary transfer ID generation.

Created TransferEvent type for transfer history.

### Important architectural decision

Transfer status and transfer history are separate concepts.

The status represents the current state.

Transfer events represent what happened throughout the transfer lifecycle.

### Backend status

No backend has been implemented yet.

No database has been implemented yet.

The domain model is currently represented with TypeScript types.

# HOPE Project Progress

## Transfer Management and Status Updates

**Status: In progress**

### Goals

Build the hospital transfer management workflow that allows hospital staff to create transfer requests, view existing transfers, inspect transfer details, and update transfer status.

### Completed

1. Created the transfer request form with patient information, medical information, urgency, receiving hospital, medical support, and ambulance requirements.
2. Created a shared `TransferContext` to manage transfer data across screens.
3. Implemented the Transfers screen to display created transfer requests.
4. Implemented the Transfer Details screen to display the selected transfer's information.
5. Registered the transfer details route with the hospital tab navigator while keeping it hidden from the permanent bottom tab bar.
6. Added `updateTransferStatus` to `TransferContext`.
7. Implemented local status updates and refreshed the `updatedAt` timestamp when a status changes.
8. Added status selection controls and a Save Status action to the Transfer Details screen.
9. Verified that transfer creation, navigation, transfer details, and status updates work.
10. Ran `npx tsc --noEmit` successfully.

### Current Architecture

- `src/app/_layout.tsx`: Root layout and shared provider.
- `src/app/(hospital)/_layout.tsx`: Hospital tab navigation.
- `src/app/(hospital)/home.tsx`: Hospital home screen.
- `src/app/(hospital)/transfers.tsx`: Transfer list.
- `src/app/(hospital)/transfer-details.tsx`: Details and status management.
- `src/app/(hospital)/messages.tsx`: Messages screen.
- `src/app/(hospital)/profile.tsx`: Profile screen.
- `src/app/create-transfer.tsx`: Transfer creation form.
- `src/store/TransferContext.tsx`: Shared transfer state.
- `src/types/transfer.ts`: Transfer domain types.

### Important Limitations

1. Transfer data is stored in React state and is not persisted to a database.
2. Data may disappear when the app restarts or the provider is remounted.
3. Status updates are local and are not sent to a backend.
4. Status changes are not yet recorded in an activity timeline.
5. The status editor currently allows selection of statuses without enforcing a valid transition sequence.
6. Authentication and authorization are not yet connected to a production backend.
7. Hospital acceptance, ambulance dispatch, GPS tracking, and patient handover are not yet integrated with real operational services.

### Next Milestone

**Transfer Activity Timeline**

- Introduce activity history in the shared state.
- Record transfer creation and status changes.
- Display chronological activity in Transfer Details.
- Prepare the model for backend persistence and audit history.

After the local timeline works, the next major engineering milestone should be backend persistence and API integration.

# HOPE — Milestone: Transfer Management and Status Workflow

## Project overview

HOPE is a patient-transfer coordination platform designed to help coordinate transfers from a hospital that cannot provide the required treatment to a suitable receiving hospital, including ambulance coordination and handover.

## Milestone objective

Build a working mobile transfer-management flow with transfer details, status updates, centralized transition rules, and an activity timeline.

## Files involved

- `src/types/transfer.ts` — TypeScript domain types for transfer requests, statuses, and events.
- `src/store/TransferContext.tsx` — Shared in-memory transfer state, transfer creation, status-transition validation, and activity events.
- `src/app/(hospital)/transfer-details.tsx` — Transfer details screen, collapsible status editor, and activity timeline.
- Existing transfer creation and transfers-list screens — Used to create and view transfers through the app.

## Functionality completed

1. Display patient and medical information.
2. Display receiving-hospital and ambulance requirements.
3. Display the current transfer status.
4. Expand and collapse the status editor.
5. Show only allowed next statuses in the editor.
6. Validate status transitions in the shared transfer context.
7. Update the transfer status and `updatedAt` timestamp after a valid change.
8. Record status-change events with previous and new statuses.
9. Display a chronological activity timeline.
10. Prevent duplicate transfer entries with the same transfer ID.
11. Handle missing transfers and transfers that have reached terminal statuses.

## Architecture

The transfer details screen reads transfer data and invokes actions from `TransferContext`. The context owns the current in-memory state and validates proposed status changes using a centralized transition map.

The activity timeline reads events associated with a transfer and displays them in chronological order.

## Technology decisions

### React Native and Expo

Chosen to build a cross-platform mobile application with an accessible development workflow. Separate native applications were not necessary for this stage.

### Expo Router

Chosen for file-based routing and screen organization.

### TypeScript

Chosen to define explicit transfer status unions and data structures, reducing errors from invalid status strings and inconsistent data shapes.

### React Context and React state

Chosen for straightforward sharing of transfer data between screens while the app remains a local prototype. Redux or another state library can be considered if state complexity grows, but neither would replace backend persistence.

### React Native StyleSheet

Chosen for explicit styling after deciding not to continue with NativeWind in this project.

### Centralized transition rules

Chosen so status-transition logic is shared instead of being independently implemented in every screen. In production, the backend must enforce these rules as the trusted source of truth.

## Current workflow

The normal workflow is:

Submitted → Under Review → Receiving Hospital Requested → Receiving Hospital Accepted → Ambulance Search → Ambulance Assigned → Ambulance En Route to Pickup → Patient Picked Up → In Transit → Arrived → Handed Over → Completed.

The transition map also defines exceptional outcomes, including rejection, cancellation, delay, and transfer failure. Not every stage can transition to every other stage.

## Validation performed

The developer confirmed that the updated app and status editor work. The TypeScript check was run successfully after updating the shared transition logic.

Before the next release, manually test the full workflow, exceptional outcomes, missing transfer handling, and terminal statuses.

## Known limitations

- Transfer data and events exist only in memory and are lost when the app process resets.
- Transition rules are currently enforced on the client only.
- Staff identity, authentication, authorization, and hospital-specific access are not implemented in this milestone.
- Activity events do not yet identify the staff member who made a change.
- Delayed transfers do not retain a precise previous stage for controlled resumption.
- Receiving-hospital confirmation, ambulance dispatch, live tracking, notifications, and handover verification are not integrated.
- A client-side success message is not proof of a persisted or server-authorized change.

## Next milestone

Build the backend foundation using Node.js, TypeScript, Express, PostgreSQL, and Prisma, subject to confirming the existing project structure and dependencies first.

The backend should become the source of truth for transfer records and status transitions. It should support persistence, input validation, structured errors, authenticated access, and auditable updates.

## Definition of done

This milestone is considered complete for the current prototype because the developer confirmed the updated status workflow works.

It does not mean the app is production-ready for real patient data or operational hospital transfers.
