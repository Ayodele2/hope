# HOPE API

## Current Status

The backend does not exist yet.

## Planned Backend

- Node.js
- TypeScript
- REST API
- PostgreSQL
- Prisma

## Planned Responsibilities

The backend will eventually handle:

- Authentication
- Authorization
- Hospitals
- Users
- Patients
- Transfers
- Ambulances
- Transfer events
- Messages
- Notifications

## API Principle

Business-critical operations will be performed on the server.

The mobile application should not be trusted to enforce authorization or important business rules.

# HOPE API Planning

## Current API Status

No production transfer API has been implemented in this milestone.

Transfer creation and status changes currently operate through local React Context.

## Proposed Transfer Operations

The following operations describe the future backend contract. They are plans, not implemented endpoints.

### Create Transfer

`POST /transfers`

Creates a transfer request after authentication, authorization, and server-side validation.

### List Transfers

`GET /transfers`

Returns only the transfers the authenticated user is authorized to access.

### Get Transfer Details

`GET /transfers/:id`

Returns the details of an authorized transfer.

### Update Transfer Status

`PATCH /transfers/:id/status`

Requests a status transition. The server must validate the transition, user permissions, and any required operational conditions.

### Get Transfer Activity

`GET /transfers/:id/events`

Returns the authorized chronological activity history for a transfer.

## Future Data Requirements

The backend should persist transfer records and activity events.

Each activity event should identify the transfer, event type, timestamp, and, where appropriate, the responsible authenticated user and an explanatory note.

The API must not rely on the mobile application to enforce access permissions or valid status transitions.

## Security Considerations

Patient information is sensitive. Before production use, the implementation needs authentication, authorization, secure data transport, appropriate retention policies, auditability, and a security/privacy review.

The current local prototype must not be treated as a production patient-transfer coordination system.
