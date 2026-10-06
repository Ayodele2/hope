# HOPE Navigation

## Current Navigation

The application currently contains one route:

- `/`

This route exists only to verify that Expo Router is correctly configured.

## Planned Navigation

The eventual authentication flow will be:

Welcome
↓
Role Selection
↓
Login / Signup
↓
Role Dashboard

## Hospital Navigation

The hospital application will eventually contain:

- Home
- Transfers
- Messages
- Profile

These will be persistent top-level areas and therefore are candidates for bottom tabs.

Actions such as creating a transfer should not become permanent tabs.

## Navigation Principle

Tabs represent persistent top-level areas.

Stack/detail/modal routes represent workflows, actions, and deeper content.
