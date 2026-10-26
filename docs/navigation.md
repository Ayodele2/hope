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

# HOPE Navigation

## Root Navigation

`src/app/_layout.tsx` wraps the Expo Router stack in `TransferProvider`.

This allows screens beneath the root layout to access the shared transfer state.

## Hospital Navigation

`src/app/(hospital)/_layout.tsx` defines the hospital tab navigator.

Current visible tabs:

- Home
- Transfers
- Messages
- Profile

The Transfer Details route is registered with the navigator but hidden from the permanent bottom tab bar using `href: null`.

## Transfer Details Navigation

The Transfers screen navigates to the details route and passes the selected transfer ID.

The details screen reads the ID with `useLocalSearchParams` and locates the matching transfer in shared state.

The screen includes a back action to return to the previous screen.

## Design Decision

Transfer Details is a record-specific screen, not a general destination like Home or Messages. Hiding it from the permanent tab bar prevents users from opening the screen without first selecting a transfer.

## Known Route Dependency

The transfer details screen depends on a valid transfer ID and the transfer being present in the current provider state.

If the transfer is missing, the screen displays a Transfer not found message.
