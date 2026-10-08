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
