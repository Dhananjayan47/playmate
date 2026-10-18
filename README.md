# PlayMate — Sports Ground Booking & Matchmaking Platform

PlayMate is a responsive web application designed for athletes and sports enthusiasts to discover local grounds, reserve court time slots, and connect with teammates for open pickup matches . 

- Live Demo: https://playmate-gamma.vercel.app/
- Walkthrough Video: Loom Video Walkthrough (3-5 min) https://www.loom.com/share/87d59d93ee5f4fdf9fcb0ada57397aa2
- Tech Stack: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, React Hot Toast 

---

## 1. Folder Structure & Architectural Decisions

The codebase uses a domain-driven / feature-based directory structure rather than grouping all components into a single flat directory . This architecture ensures high cohesion and low coupling by keeping files related to a specific domain (venues, bookings, pickup matches) co-located.

```text
playmate/
├── public/
├── src/
│   ├── assets/              # Static SVG icons and imagery
│   ├── components/          # Shared atomic components & core application scaffolding
│   │   ├── layout/          # Global layout frames (AppLayout, Navbar, MobileNav)
│   │   └── shared/          # Reusable shared elements (EmptyState)
│   ├── context/             # Domain-segregated global state providers
│   │   ├── BookingContext.tsx # Venue slots, reservations, cancellations & storage sync
│   │   └── MatchContext.tsx   # Pickup game match feed, join lifecycle & hosting
│   ├── data/                # Initial seed data simulating server databases
│   │   ├── venues.mock.ts   # Venues, facilities, and dynamic date-slot mapping
│   │   ├── games.mock.ts    # Open pickup games and host metadata
│   │   └── bookings.mock.ts # Seed user reservations (upcoming, past, cancelled)
│   ├── features/            # Feature/domain modules
│   │   ├── home/            # Screen 1: Ground exploration, multi-criteria filters
│   │   │   ├── components/VenueCard.tsx
│   │   │   └── HomePage.tsx
│   │   ├── venues/          # Screen 2: Venue details, date & slot booking grid
│   │   │   ├── components/SlotPicker.tsx
│   │   │   ├── components/BookingSummaryModal.tsx
│   │   │   └── VenueDetailsPage.tsx
│   │   ├── matches/         # Screen 3: Find players feed & game creation
│   │   │   ├── components/MatchCard.tsx
│   │   │   ├── components/HostGameModal.tsx
│   │   │   └── FindPlayersPage.tsx
│   │   ├── bookings/        # Screen 5: Reservation management & cancellation
│   │   │   ├── components/BookingCard.tsx
│   │   │   ├── components/CancelModal.tsx
│   │   │   └── MyBookingsPage.tsx
│   │   └── profile/         # Screen 4: Player profile and metrics overview
│   │       └── ProfilePage.tsx
│   ├── routes/
│   │   └── AppRouter.tsx    # Declarative page routing with React Router
│   ├── types/
│   │   └── index.ts         # Central TypeScript interfaces, unions, and schemas
│   ├── App.tsx              # Application root, provider composition & Toast mount
│   ├── main.tsx             # DOM mount point
│   └── index.css            # Tailwind CSS directives
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

### Why this structure?
- Separation of Concerns: Business logic for booking time slots is completely isolated from the matchmaking feed .
- Scalability: New domains (e.g., tournament brackets, turf owner management dashboards) can be added as independent feature directories without altering existing code.
- Maintainability: Locating and editing a component (like SlotPicker.tsx or BookingCard.tsx) is immediate because it lives inside its domain subfolder .

---

## 2. Components Built

| Screen / Area | Component | Primary Responsibility |
| :--- | :--- | :--- |
| Global Scaffolding | AppLayout.tsx | Sticky desktop header with glassmorphism + mobile bottom navigation dock . |
| Global Scaffolding | AppRouter.tsx | Maps client routes (/, /venues/:id, /matches, /bookings, /profile) . |
| Home Screen | HomePage.tsx | Coordinates search, sport pill selectors, and range filter sliders . |
| Home Screen | VenueCard.tsx | Displays venue thumbnail, rating badge, distance, starting rate, and CTA . |
| Home Screen | EmptyState.tsx | Illustrated empty state view with a functional "Reset Filters" action . |
| Venue Details | VenueDetailsPage.tsx | Assembles photo gallery, facility amenities list, and sticky booking sidebar . |
| Venue Details | SlotPicker.tsx | Renders date tabs and time slot chips with distinct states (Available, Booked, Selected) . |
| Venue Details | BookingSummaryModal.tsx | Review modal with split billing calculation and reservation confirmation . |
| Find Players | FindPlayersPage.tsx | Pickup games feed with search and sport filter pills . |
| Find Players | MatchCard.tsx | Game ticket showing spots left, host info, dynamic progress dots, and the "Join" button . |
| Find Players | HostGameModal.tsx | Validated modal form to post new open matches into the community feed . |
| My Bookings | MyBookingsPage.tsx | Tabbed controller ("Upcoming" vs "Past / Cancelled") . |
| My Bookings | BookingCard.tsx | Ticket card displaying venue photo, court ID, time, split details, and cancel button . |
| My Bookings | CancelModal.tsx | Confirmation dialogue before releasing a reserved court slot . |
| Profile | ProfilePage.tsx | User identity banner, sports played tags, and calculated activity metrics . |

---

## 3. Where State Lives

The application avoids monolithic global state by splitting data into dedicated contexts and persisting state to browser storage :

### 1. BookingContext.tsx
- State Managed:
  - venues: An array of venues with their nested slot arrays indexed by ISO date string (Record<string, TimeSlot[]>) .
  - bookings: An array of all active and historical reservations created by the user .
- Persistence: Synchronized with localStorage (pm_venues, pm_bookings). When a user reserves a court or cancels a booking, it updates the state immutably and saves it to local storage. A page refresh does not reset booked slots .
- Slot Mutability: When a slot is booked, bookSlot() locates the specific venue and date, sets isBooked: true, and appends a booking record . When cancelBooking() is called on an upcoming booking, it releases that exact slot back to available (isBooked: false) .

### 2. MatchContext.tsx
- State Managed:
  - games: Array of open pickup matches looking for players .
- Persistence: Synchronized with localStorage (pm_games).
- Join & Host State: 
  - requestToJoin(gameId): Sets isRequested: true on that match and adds a new JoinRequest record to pendingRequests .
  - hostNewGame(formData): Prepends a new game to the feed flagged with hostId: CURRENT_USER_ID (isHost: true) .

### 3. Component Local State (useState)
- Ephemeral UI concerns (e.g., search text input, price slider value, selected date tab, modal open/close states) are kept inside their respective components to prevent unnecessary application-wide re-renders.

---

## 4. What Was Added Beyond the Requirements ("Make It Yours") 

The following features were designed and implemented beyond the basic brief to elevate user experience :

1. Full Browser State Persistence (localStorage):
   - All bookings, cancellations, newly hosted games, and slot availability changes persist across browser reloads.
2. Interactive Split-Bill Calculator:
   - On the Venue Details page and inside the booking confirmation modal, users can adjust a player count stepper (e.g., 4 players). It dynamically computes the per-person cost (e.g., ₹600 total = ₹150 / person) to support group play.
3. Simulated Host Approval Lifecycle:
   - The brief required the "Join" button to switch to "Request Sent" . When you create a match using "+ Host a Game", the card marks you as Hosted by You . If a player requests to join, an interactive "Incoming Requests" section appears with functional Accept and Decline controls that update spots remaining in real time.
4. Interactive Cancellation & Slot Rollback:
   - Cancelling an upcoming booking prompts a confirmation modal, marks the booking as cancelled, and instantly frees up that time slot on the venue page so it can be re-booked .
5. Mobile-First Bottom Dock Navigation:
   - Added a bottom app dock (Explore, Players, Bookings, Profile) optimized for thumb reach on mobile devices alongside the desktop navbar .
6. Zero Dead Buttons & Rich Toast Feedback:
   - Every interactive element triggers an action, modal, route transition, or notification via react-hot-toast .

---

## 5. What I Would Improve With More Time 

1. Backend & Real-Time WebSockets:
   - Implement Node.js/Express with PostgreSQL and Socket.io so when one user reserves a slot or joins a match, every other user's screen updates in real time without refreshing.
2. Interactive Court Visualizer:
   - Build an interactive SVG map representing physical badminton courts or turf sections (Court 1 vs Court 2) so players can choose their exact spot visually.
3. Integrated Payment Gateway Mock:
   - Add a step-by-step payment modal simulating Razorpay/Stripe checkout (UPI QR code scanner, card form) before issuing the booking confirmation.
4. Geolocation API Integration:
   - Utilize navigator.geolocation to compute true user distance from sports facilities rather than simulated kilometer values.
5. Unit & End-to-End Testing:
   - Add Vitest and React Testing Library to test multi-filter combinations, slot booking collisions, and cancellation state rollbacks.

---

## Getting Started Locally

# 1. Clone repository
git clone https://github.com/Dhananjayan47/playmate.git
cd playmate

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
