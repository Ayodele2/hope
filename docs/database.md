# HOPE Database

## Current Status

No database has been connected yet.

## Planned Database

PostgreSQL will be used when backend development begins.

## Why PostgreSQL

HOPE contains highly relational data.

Examples:

Hospital -> Staff
Hospital -> Transfers
Transfer -> Patient
Transfer -> Receiving Hospital
Transfer -> Ambulance
Transfer -> Dispatcher
Transfer -> Events

PostgreSQL provides strong relational modeling and transactional consistency.

## Planned ORM

Prisma will be evaluated and introduced during the backend milestone.

## Important Principle

Database entities will be introduced incrementally.

We will not create every table before the product workflow requires them.
