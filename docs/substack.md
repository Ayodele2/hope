# Why I'm Building HOPE: A Patient-Transfer Coordination App

I'm building HOPE around a problem that involves more than a single screen or service: coordinating the transfer of a patient from one hospital to another.

When a hospital cannot provide the required treatment, staff may need to locate a receiving hospital, confirm acceptance, arrange transport, communicate patient information, and coordinate the handover.

HOPE is intended to provide a coordination layer for that workflow.

## Starting with the foundation

I'm beginning with the mobile application structure, navigation, and user experience using React Native, Expo, TypeScript, and Expo Router.

The planned flow starts with Welcome, Role Selection, Authentication, and a dashboard. The hospital area includes Home, Transfers, Messages, and Profile.

## Why I'm building incrementally

A working interface is not the same as a dependable operational system. HOPE will eventually need persistent data, authentication, permissions, validated workflows, and appropriate safeguards for sensitive patient information.

I'm building the foundation first, then adding functionality in deliberate milestones.

This is the beginning of the HOPE journey, and I'll document the technical challenges and decisions as the project develops.

# Building HOPE: Designing the User Entry Experience

The second stage of HOPE focuses on the experience users encounter when opening the application.

Before users can coordinate patient transfers, they need a clear way to enter the application and identify their role.

## What this milestone covers

The frontend work includes a welcome screen, role selection, login, and sign-up.

The screens are built with React Native, Expo Router, and TypeScript.

## Why navigation matters

The entry flow establishes how users move into the rest of the application. As HOPE grows, different roles will require different workflows and access permissions.

Getting the route structure right now makes it easier to develop those experiences in an organized way.

## What remains

The current authentication experience is frontend work. Production authentication, backend integration, secure sessions, and authorization still need to be implemented.

This milestone is about building a usable foundation without confusing a working interface with a production-ready identity system.

# Building HOPE: Creating the Hospital Application Shell

After establishing the initial entry and authentication screens, I moved on to the hospital application shell.

The objective was to create a clear structure for the main areas hospital users will need.

## The four main sections

- Home
- Transfers
- Messages
- Profile

Expo Router provides the navigation structure, while React Native and TypeScript support the screen implementations.

## Why build the shell first?

The shell establishes where features belong and how users navigate between them. It also provides a consistent place to introduce transfer management without making every feature a separate, disconnected screen.

## What's next?

The next stage is the transfer request workflow: creating a transfer, displaying it in a list, opening its details, and managing its status.

The current shell is a frontend structure. Persistent data, real-time messaging, and integrations remain future work.

I'm building HOPE incrementally, with each milestone providing a foundation for the next.

# Building HOPE: From Transfer Forms to a Coordinated Workflow

I'm building HOPE, a patient-transfer coordination app concept designed around a simple problem: when one hospital cannot provide the required treatment, coordinating the receiving hospital, ambulance, patient information, and handover can involve multiple steps and people.

## What I've built

The current prototype supports creating transfer requests, viewing a transfer list, opening individual transfer details, and updating a transfer's status.

The app uses React Native, Expo Router, TypeScript, and React Context for local state management.

## What I'm learning

The screens are only the beginning. A coordination platform needs consistent domain models, reliable persistence, permissions, valid status transitions, and an activity history that explains what happened and when.

The current implementation stores transfer data in memory, so it is not yet suitable for real operational use.

## What's next

I'm working toward an activity timeline that records transfer creation and status changes. After that, I plan to move the transfer workflow toward a persistent backend API and database.

I'm approaching HOPE milestone by milestone, with a focus on understanding the architecture rather than simply assembling screens.

This is an ongoing engineering project, and the current prototype is an early step toward the larger goal.

# Building HOPE: From Transfer Forms to a Coordinated Workflow

I'm building HOPE, a patient-transfer coordination app concept designed around a simple problem: when one hospital cannot provide the required treatment, coordinating the receiving hospital, ambulance, patient information, and handover can involve multiple steps and people.

## What I've built

The current prototype supports creating transfer requests, viewing a transfer list, opening individual transfer details, and updating a transfer's status.

The app uses React Native, Expo Router, TypeScript, and React Context for local state management.

## What I'm learning

The screens are only the beginning. A coordination platform needs consistent domain models, reliable persistence, permissions, valid status transitions, and an activity history that explains what happened and when.

The current implementation stores transfer data in memory, so it is not yet suitable for real operational use.

## What's next

I'm working toward an activity timeline that records transfer creation and status changes. After that, I plan to move the transfer workflow toward a persistent backend API and database.

I'm approaching HOPE milestone by milestone, with a focus on understanding the architecture rather than simply assembling screens.

This is an ongoing engineering project, and the current prototype is an early step toward the larger goal.

# Building HOPE: From Transfer Forms to a Coordinated Workflow

I'm building HOPE, a patient-transfer coordination app concept designed around a simple problem: when one hospital cannot provide the required treatment, coordinating the receiving hospital, ambulance, patient information, and handover can involve multiple steps and people.

## What I've built

The current prototype supports creating transfer requests, viewing a transfer list, opening individual transfer details, and updating a transfer's status.

The app uses React Native, Expo Router, TypeScript, and React Context for local state management.

## What I'm learning

The screens are only the beginning. A coordination platform needs consistent domain models, reliable persistence, permissions, valid status transitions, and an activity history that explains what happened and when.

The current implementation stores transfer data in memory, so it is not yet suitable for real operational use.

## What's next

I'm working toward an activity timeline that records transfer creation and status changes. After that, I plan to move the transfer workflow toward a persistent backend API and database.

I'm approaching HOPE milestone by milestone, with a focus on understanding the architecture rather than simply assembling screens.

This is an ongoing engineering project, and the current prototype is an early step toward the larger goal.

# Building HOPE: Why a Working Status Dropdown Isn't Enough

I'm building HOPE, a patient-transfer coordination application designed to help coordinate the process of transferring a patient from one hospital to another.

The problem is operational as much as technical. A transfer can involve confirming a receiving hospital, arranging an ambulance, communicating transfer requirements, coordinating pickup, tracking the journey, and completing a handover.

For this milestone, I focused on one part of the mobile application: transfer management.

## From a screen to a workflow

The app now displays transfer details, allows the status editor to expand and collapse, and records status changes in an activity timeline.

I also centralized the allowed status transitions in the shared transfer context.

That decision matters because a transfer workflow should have rules. A submitted transfer should not jump straight to completion without the appropriate stages being handled.

The current workflow models stages such as review, receiving-hospital coordination, ambulance assignment, pickup, transit, arrival, handover, and completion. It also accounts for exceptional outcomes such as rejection, cancellation, delays, and transfer failure.

## The technology behind this milestone

I'm using React Native and Expo for the mobile application, Expo Router for navigation, TypeScript for domain types, and React Context for shared transfer state.

For this stage, Context is enough to share transfer data and actions between screens without introducing another state-management dependency. It is not a replacement for a backend or database.

## What I learned

A UI can appear to work while the underlying workflow remains inconsistent.

Centralizing transition rules helps keep the behavior consistent across screens. The activity timeline also makes changes visible instead of showing only the latest status.

But client-side validation is not a security boundary. A production backend must enforce the same rules and determine whether the authenticated user has permission to make a change.

## What's next

The current transfer data lives in memory, which means it may disappear when the app restarts.

My next milestone is to build the backend foundation, evaluate the existing project structure, introduce persistent transfer records, and move authoritative validation to the server.

Authentication, hospital-specific permissions, secure handling of patient information, and an auditable record of staff actions will be essential before operational use.

I'm building HOPE milestone by milestone, documenting not only what works but also what remains unfinished. The goal is to understand the system being built—not just to make the next screen render.

### Substack

**Title: Building HOPE: From a Mobile Prototype to a Persistent Backend**

I'm building HOPE, a patient-transfer coordination platform intended to help hospitals coordinate patient transfers when the necessary treatment is unavailable at the current facility.

Until now, much of my attention has been on the mobile experience and transfer workflow. But a working interface is only one part of a system.

For HOPE to become a useful coordination platform, transfer information needs to be stored persistently and made available through a backend.

This milestone focused on establishing that foundation.

I set up PostgreSQL as the database, Prisma as the database access layer, and Express as the API framework. I created an initial transfer data model and implemented endpoints to create and retrieve transfer requests.

The most important test was not simply starting the server. I submitted a fictional transfer through the API, received a generated record ID, and then retrieved the saved record through a separate request.

That confirmed the basic create-and-read workflow.

There is still a significant amount of work ahead. The current API is a development implementation, not a production healthcare service. Authentication, hospital-specific permissions, audit trails, secure handling of patient information, and ambulance coordination all need careful design.

The next milestone is connecting the backend to the existing React Native application so that transfers can be created and retrieved from the database instead of relying entirely on local state.

I'm building HOPE step by step, learning from each milestone, and documenting the decisions along the way.

### LinkedIn

I've reached another milestone in building HOPE, a patient-transfer coordination platform designed to help coordinate transfers between hospitals.

This milestone focused on establishing the backend foundation.

I set up PostgreSQL, configured Prisma ORM, and built an Express API that can create and retrieve transfer requests.

I also tested the complete database interaction: a transfer was submitted through the API, saved to PostgreSQL, and retrieved successfully.

One of my biggest takeaways is that building a feature isn't just about getting a successful response. It's about verifying that the data is actually persisted and can be retrieved when needed.

Next, I'm working on connecting the existing React Native application to the backend.

HOPE is still under development, and there's more to do around authentication, hospital permissions, patient-data protection, ambulance coordination, and audit history.

Building this project is helping me deepen my understanding of backend architecture while working toward a real coordination problem.

#ReactNative #NodeJS #PostgreSQL #Prisma #TypeScript #HealthcareTechnology #SoftwareEngineering

---

### Substack

**Title: Building HOPE: From a Mobile Prototype to a Persistent Backend**

I'm building HOPE, a patient-transfer coordination platform intended to help hospitals coordinate patient transfers when the necessary treatment is unavailable at the current facility.

Until now, much of my attention has been on the mobile experience and transfer workflow. But a working interface is only one part of a system.

For HOPE to become a useful coordination platform, transfer information needs to be stored persistently and made available through a backend.

This milestone focused on establishing that foundation.

I set up PostgreSQL as the database, Prisma as the database access layer, and Express as the API framework. I created an initial transfer data model and implemented endpoints to create and retrieve transfer requests.

The most important test was not simply starting the server. I submitted a fictional transfer through the API, received a generated record ID, and then retrieved the saved record through a separate request.

That confirmed the basic create-and-read workflow.

There is still a significant amount of work ahead. The current API is a development implementation, not a production healthcare service. Authentication, hospital-specific permissions, audit trails, secure handling of patient information, and ambulance coordination all need careful design.

The next milestone is connecting the backend to the existing React Native application so that transfers can be created and retrieved from the database instead of relying entirely on local state.

I'm building HOPE step by step, learning from each milestone, and documenting the decisions along the way.
