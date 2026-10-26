# 🚀 Building HOPE: Turning a Healthcare Coordination Problem into a Software Project

I’m building HOPE, a patient-transfer coordination app designed to help coordinate transfers when a hospital cannot provide the treatment a patient needs.

The idea is straightforward: Hospital A needs to transfer a patient to Hospital B, but the process can involve finding a receiving hospital, arranging an ambulance, communicating important information, and coordinating the handover.

HOPE aims to bring those steps into one coordinated workflow.

I’m approaching the project milestone by milestone, starting with the application foundation, navigation, and user experience.

The initial architecture uses React Native, Expo, TypeScript, and Expo Router.

The planned navigation flow includes:

Welcome → Role Selection → Authentication → Dashboard

For hospital users, the application will include Home, Transfers, Messages, and Profile.

The long-term goal is to build beyond screens into a dependable coordination platform. That will require backend persistence, access controls, operational workflows, and appropriate security measures.

For now, I’m focusing on getting the foundation right and understanding every architectural decision along the way.

Follow along as I build HOPE.

#BuildInPublic #ReactNative #HealthTech #SoftwareEngineering #TypeScript

# 🚀 HOPE Development Update: Building the Authentication Experience

Milestone 2 of building HOPE focuses on the authentication user experience.

I've been working on the screens that guide users from the welcome screen through role selection, login, and sign-up.

The aim is to make the entry experience clear and prepare the application for role-specific workflows.

The project uses React Native, Expo Router, and TypeScript, with navigation organized around the app's route structure.

One important distinction: these screens establish the frontend experience. They should not be confused with production authentication or a secure backend identity system.

The next step is to connect the user experience to the rest of the hospital application.

I'm learning that a good foundation isn't only about how screens look — it's also about how users move through the application and how the architecture supports future features.

#ReactNative #Expo #TypeScript #BuildInPublic #HealthTech

I’m building HOPE, a mobile application concept focused on improving hospital-to-hospital patient-transfer coordination.

This stage of development has focused on the core transfer workflow: creating a transfer request, viewing transfer records, opening detailed patient-transfer information, and updating transfer statuses.

Technically, I’ve been working with React Native, Expo Router, TypeScript, and React Context to build and connect the core screens.

One key lesson is that a working UI is only one part of a coordination system. Reliable persistence, permissions, status validation, and an auditable activity history are also essential before a system like this can be used operationally.

The next step is to introduce transfer activity history and then move toward backend persistence.

Building HOPE one milestone at a time.

#ReactNative #TypeScript #HealthTech #SoftwareEngineering #MobileDevelopment

# 🚀 HOPE Milestone 3: Building the Hospital Application Shell

The next step in building HOPE was to create the main application structure for hospital users.

I implemented the hospital navigation shell with four main sections:

🏠 Home  
🔄 Transfers  
💬 Messages  
👤 Profile

I also organized the routes using Expo Router and created the structure needed for future transfer-management functionality.

The goal was to give the application a consistent foundation before adding more complex workflows.

One thing I'm learning through this process is the importance of separating navigation, screen responsibilities, and domain logic. A well-organized application becomes easier to extend and debug.

The shell is a frontend foundation. Real-time messaging, backend transfer persistence, and production integrations are separate pieces of work still to come.

Next, I'm focusing on the transfer request workflow.

#ReactNative #ExpoRouter #TypeScript #HealthTech #BuildInPublic

# 🚀 I'm building HOPE, a mobile application concept focused on improving hospital-to-hospital patient-transfer coordination.

This stage of development has focused on the core transfer workflow: creating a transfer request, viewing transfer records, opening detailed patient-transfer information, and updating transfer statuses.

Technically, I've been working with React Native, Expo Router, TypeScript, and React Context to build and connect the core screens.

One key lesson is that a working UI is only one part of a coordination system. Reliable persistence, permissions, status validation, and an auditable activity history are also essential before a system like this can be used operationally.

The next step is to introduce transfer activity history and then move toward backend persistence.

Building HOPE one milestone at a time.

#ReactNative #TypeScript #HealthTech #SoftwareEngineering #MobileDevelopment

# 🚀 **Debugging HOPE: Fixing a React Native Navigation and Screen Responsibility Bug**

While building HOPE, my hospital-to-hospital patient transfer coordination app, I encountered a bug in the transfer management workflow.

The goal was to create a transfer, display it in a list, and open a dedicated details screen when a user tapped a transfer card.

However, the Transfers screen and Transfer Details screen were rendering the same content.

Instead of rewriting the entire feature, I traced the issue to the screen implementation and file structure.

🔍 **1. The problem: Incorrect screen responsibilities**

The detail-screen implementation had accidentally been placed in `transfers.tsx`.

That meant the route intended to display a list was rendering a single transfer's details instead.

**The fix:** I separated the responsibilities into two files:

- `src/app/(hospital)/transfers.tsx` — displays transfer summaries.
- `src/app/(hospital)/transfer-details.tsx` — displays the details of the selected transfer.

🔧 **2. The navigation fix: Passing the correct transfer ID**

Using Expo Router, I navigated to the details route with the selected transfer's ID:

```tsx
onPress={() =>
  router.push({
    pathname: "/(hospital)/transfer-details",
    params: { id: transfer.id },
  })
}
```

The details screen then reads the route parameter and finds the matching record in shared state:

```tsx
const { id } = useLocalSearchParams<{
  id: string | string[];
}>();

const { transfers } = useTransfers();

const transferId = Array.isArray(id) ? id[0] : id;

const transfer = transfers.find((item) => item.id === transferId);
```

This ensures the screen displays the transfer selected by the user rather than rendering the entire list or an unrelated record.

🧠 **3. The architectural lesson: Shared state matters**

I also verified that the transfer data was managed through a shared `TransferContext`, allowing the list and detail screens to access the same in-memory collection.

This avoided passing the entire transfer object through navigation and kept the transfer ID as the route parameter.

✅ **4. Verification**

After correcting the screen responsibilities and navigation, I tested the full workflow:

Create transfer → View transfer list → Open selected transfer → View details → Return to list.

I also ran:

```bash
npx tsc --noEmit
```

TypeScript passed without errors.

**The result:** The transfer list and details screen now perform separate responsibilities, and selecting a transfer opens the correct record.

This is still an early prototype: transfer data currently lives in memory, so persistent backend storage is a future step.

💡 **My takeaway:** Debugging isn't always about changing a function. Sometimes the real fix is understanding how routes, components, and shared state fit together.

I'm building HOPE one milestone at a time, with a focus on understanding the architecture behind the features — not just getting the UI to work.

**Have you encountered a bug where the root cause turned out to be the way your screens or components were structured?**

#ReactNative #ExpoRouter #TypeScript #SoftwareEngineering #HealthTech #BuildInPublic

# Building HOPE one milestone at a time.

HOPE is a patient-transfer coordination platform I'm building to help coordinate the process of moving patients between hospitals when the required treatment isn't available at the current facility.

This milestone focused on the transfer-management workflow.

Here's what I implemented:

• A transfer details screen for patient, medical, and ambulance requirements  
• A collapsible status editor  
• Centralized rules for valid transfer status transitions  
• An activity timeline showing status changes  
• TypeScript types to keep the workflow structured and consistent

One lesson from this milestone: a status dropdown is not a workflow. The application needs rules about which transitions are allowed, where those rules live, and how changes are recorded.

I'm currently using React Native, Expo Router, TypeScript, and React Context. The current implementation is a local prototype, so persistence, backend validation, authentication, and permissions are still ahead.

Next, I'll focus on the backend foundation and persistent transfer records.

I'm building HOPE incrementally, documenting the decisions and learning from each milestone along the way.

#ReactNative #TypeScript #SoftwareEngineering #HealthTech #BuildInPublic

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
