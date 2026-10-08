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
