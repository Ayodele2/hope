# **I'm building HOPE, a hospital patient-transfer coordination app**

I'm working on a mobile app concept to coordinate transfers between hospitals when the current hospital cannot provide the treatment a patient needs.

The workflow can involve finding a receiving hospital, confirming acceptance, arranging an ambulance, sharing transfer information, coordinating pickup, and confirming handover.

I'm starting with the application foundation and navigation using React Native, Expo, TypeScript, and Expo Router.

My plan is to build this incrementally, learning the architecture as I go rather than building screens without understanding how they fit together.

What would you prioritize when designing an MVP for a coordination-heavy healthcare workflow: the user experience, domain model, backend architecture, or integrations?

# **HOPE milestone update: Authentication screens**

I've moved on to the authentication experience for my patient-transfer coordination app.

The current work covers the welcome screen, role selection, login, and sign-up screens, with navigation handled through Expo Router.

These are frontend flows at this stage, not a complete production authentication system.

I'm trying to keep the project organized so that future role-specific workflows can fit into the same architecture.

For developers who have built React Native apps with multiple user roles, how do you usually structure route protection and role-based navigation once the backend authentication is introduced?

# **HOPE development update: The hospital app shell**

I've built the initial hospital navigation shell for HOPE using React Native, Expo Router, and TypeScript.

The main sections are Home, Transfers, Messages, and Profile.

The purpose of this milestone was to establish the application structure before adding the more complex transfer workflow.

The tabs and screens are part of the frontend foundation. The app doesn't yet have production backend persistence, real-time messaging, or hospital integrations.

My next step is to build the transfer request flow and connect the relevant screens through shared application state.

For anyone who has built a workflow-driven mobile app, what do you usually implement first after the navigation shell: the core domain model, the main user workflow, or the backend API?

# **Building HOPE: a hospital patient-transfer coordination app**

I'm developing HOPE as a mobile app concept to coordinate transfers between hospitals when the current hospital cannot provide the required care.

I've built the initial transfer workflow using React Native, Expo Router, TypeScript, and React Context. Users can create a transfer request, view the transfer list, open a transfer's details, and update its status in local app state.

The current version is still a prototype. It doesn't have a persistent backend, hospital integrations, ambulance dispatch, or production authentication.

I'm now working toward an activity timeline and then backend persistence.

For developers who have built workflow-heavy apps, what would you prioritize when moving from a local prototype to a reliable backend: domain modelling, status-transition rules, audit history, or API architecture?

# **Building HOPE: a hospital patient-transfer coordination app**

I'm developing HOPE as a mobile app concept to coordinate transfers between hospitals when the current hospital cannot provide the required care.

I've built the initial transfer workflow using React Native, Expo Router, TypeScript, and React Context. Users can create a transfer request, view the transfer list, open a transfer's details, and update its status in local app state.

The current version is still a prototype. It doesn't have a persistent backend, hospital integrations, ambulance dispatch, or production authentication.

I'm now working toward an activity timeline and then backend persistence.

For developers who have built workflow-heavy apps, what would you prioritize when moving from a local prototype to a reliable backend: domain modelling, status-transition rules, audit history, or API architecture?

# **Title: Building HOPE, a hospital-to-hospital patient-transfer coordination app — milestone update**

I'm building HOPE, a mobile application concept designed to coordinate hospital-to-hospital patient transfers when a facility cannot provide the treatment a patient needs.

I recently finished a milestone focused on the transfer-management workflow.

The mobile app now has:

- A transfer details screen
- A collapsible status editor
- Centralized rules for allowed status transitions
- An activity timeline showing status changes
- Typed transfer and event models in TypeScript

The stack currently includes React Native, Expo Router, TypeScript, and React Context.

One thing I've learned is that displaying a list of statuses isn't enough. A transfer should not be able to jump arbitrarily from one stage to another. The current prototype enforces transition rules in shared client-side logic, although I know those rules must also be enforced by the backend before the system can be used operationally.

The biggest limitation right now is persistence: the transfer data is still held in memory. My next milestone is to inspect the existing project structure and start building the backend and database foundation.

I'd appreciate feedback from developers who have built workflow-heavy applications:

1. How would you model status transitions for a system with normal, rejected, cancelled, and delayed paths?
2. Would you start with a modular Express API and PostgreSQL, or choose a different architecture at this stage?
3. What would you prioritize before introducing real hospital users?

I'm building this incrementally and trying to understand the architecture instead of just assembling code that happens to run.

### Reddit

**Title: Building HOPE: I got my first transfer API working with Express, Prisma, and PostgreSQL**

I'm building HOPE, a patient-transfer coordination platform intended to help coordinate hospital-to-hospital transfers.

I've just completed the initial backend foundation.

The stack is Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL. The API can now create a transfer record and retrieve it from the database.

I tested the database health endpoint, created a fictional transfer through POST, and retrieved it through GET. TypeScript checking also passes.

My next step is integrating this backend with my existing React Native app.

I know this is only a starting point. Authentication, hospital-level permissions, audit logging, and proper protection of sensitive patient data still need to be implemented before any real-world healthcare use.

For developers who have built systems involving multiple organizations, how did you approach modeling relationships and enforcing organization-level access control? I'm especially interested in lessons learned before a system reaches production.

---

### Reddit

**Title: Building HOPE: I got my first transfer API working with Express, Prisma, and PostgreSQL**

I'm building HOPE, a patient-transfer coordination platform intended to help coordinate hospital-to-hospital transfers.

I've just completed the initial backend foundation.

The stack is Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL. The API can now create a transfer record and retrieve it from the database.

I tested the database health endpoint, created a fictional transfer through POST, and retrieved it through GET. TypeScript checking also passes.

My next step is integrating this backend with my existing React Native app.

I know this is only a starting point. Authentication, hospital-level permissions, audit logging, and proper protection of sensitive patient data still need to be implemented before any real-world healthcare use.

For developers who have built systems involving multiple organizations, how did you approach modeling relationships and enforcing organization-level access control? I'm especially interested in lessons learned before a system reaches production.

---
