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
