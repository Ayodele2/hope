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
