# HOPE Technology Decisions

## React Native

### Chosen

React Native.

### Why

HOPE requires a mobile application for healthcare organizations and operational users.

### Alternative

Separate native iOS and Android applications.

### Why not

Maintaining two separate applications would increase development and maintenance costs.

---

## Expo

### Chosen

Expo.

### Why

Expo provides a productive React Native development environment and simplifies access to native capabilities.

### Alternative

Bare React Native CLI.

### Why not initially

Bare React Native introduces additional native configuration that is not necessary during the initial MVP foundation.

---

## TypeScript

### Chosen

TypeScript.

### Why

HOPE will contain complex entities and relationships including users, hospitals, transfers, ambulances, events and messages.

Strong typing reduces errors as the application grows.

### Alternative

JavaScript.

### Why not

JavaScript is flexible, but TypeScript provides stronger contracts for a growing application.

---

## Expo Router

### Chosen

Expo Router.

### Why

HOPE will contain multiple roles and several nested workflows.

File-based routing provides a clear structure for these screens.

### Alternative

Manual React Navigation configuration.

### Why not initially

It would require maintaining more navigation configuration manually.

---

## Styling

### Chosen

React Native StyleSheet.

### Why

It is built into React Native, predictable, and easy to debug.

### Alternative

NativeWind.

### Why not

HOPE does not require another styling/build configuration layer.

## Transfer Domain Model

HOPE treats a patient transfer as a core domain object.

The transfer contains:

- patient information
- medical information
- urgency
- receiving hospital
- medical support requirements
- ambulance requirements
- current status
- timestamps

Transfer status represents the current state of the transfer.

Transfer events represent the historical actions that happened during the transfer.

These concepts are intentionally separated because HOPE will need both current state and an operational audit/history trail.

The frontend currently uses TypeScript types to establish this domain model.

The backend and PostgreSQL schema will be designed around these concepts in a later milestone.

# HOPE Technology Decisions

## React Native

### Chosen

React Native with Expo.

### Why

HOPE is a mobile-first coordination application. Hospital staff need to create requests, review patient-transfer information, and coordinate transfer progress from mobile devices.

Expo simplifies local development, app execution, and navigation integration.

### Alternative

Native Android and iOS development.

### Why Not

Maintaining separate native applications would increase development effort during the MVP stage.

## TypeScript

### Chosen

TypeScript.

### Why

HOPE contains structured domain data, including transfer requests, patient details, urgency, ambulance requirements, and transfer statuses.

Types help catch mismatches during development and make the code easier to maintain as the application grows.

### Alternative

JavaScript without static typing.

### Why Not

As the transfer workflow expands, untyped status strings and inconsistently shaped objects would make bugs harder to detect.

## Expo Router

### Chosen

Expo Router.

### Why

It provides file-based navigation for the welcome, authentication, hospital, transfer creation, and transfer details screens.

It also supports route parameters for opening the details of a particular transfer.

### Alternative

React Navigation configured manually.

### Why Not

React Navigation is capable and remains an option, but Expo Router already fits the project's current structure and reduces manual route configuration.

## React Context

### Chosen

React Context with `useState` for the current prototype.

### Why

The transfer list, details screen, and creation form need to access the same transfer data. A shared provider makes this possible without passing transfer objects through every screen.

### Alternative

Redux Toolkit, Zustand, or a server-state library.

### Why Not Yet

For the current milestone, Context is sufficient and keeps the state-management architecture simple.

A more advanced state solution may become appropriate when HOPE adds complex workflows, background synchronization, notifications, and backend caching.

**Important:** React Context is currently in-memory state management. It is not a database and does not provide persistence.

## React Native StyleSheet

### Chosen

Standard React Native `StyleSheet`.

### Why

The current HOPE screens use ordinary React Native styling. This avoids additional styling configuration while the core workflow is being built.

### Alternative

NativeWind.

### Why Not Currently

NativeWind was explored earlier, but the project moved to standard styles to reduce configuration overhead and keep development focused on application behavior.

## Transfer Domain Types

### Chosen

Shared TypeScript definitions in `src/types/transfer.ts`.

### Why

The application needs consistent representations of transfer requests, urgency, status, ambulance requirements, medical support, and activity events.

Centralized types reduce duplication and prepare the application for API integration.

### Alternative

Defining separate types independently in every screen.

### Why Not

Duplicated types can drift apart and cause inconsistencies between transfer creation, listing, and detail screens.

## Future Backend Direction

### Planned, Not Yet Implemented

HOPE will need a backend API and persistent database before it can reliably coordinate real transfers between hospitals.

The backend should become the authoritative source for transfer status, access permissions, activity history, and operational updates.

The exact backend framework, database, authentication design, and deployment architecture should be decided and documented before implementation.
