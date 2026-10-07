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

## Hospital Application

The hospital application uses bottom tab navigation.

Tabs:

- Home
- Transfers
- Messages
- Profile

These are persistent top-level areas.

## Hospital Route Group

Hospital screens are organized under:

src/app/(hospital)/

The `(hospital)` directory is a route group and does not need to become part of the user-facing URL structure.

## Actions

Actions such as creating a transfer are not bottom tabs.

Create Transfer will eventually be implemented as a stack/action route because it represents a workflow rather than a persistent application area.
