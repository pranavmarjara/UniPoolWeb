# University Carpool Application

## Overview

This is a university student carpool platform that enables students to share rides safely and conveniently. Students can post ride requests (looking for rides) or ride invites (offering rides), browse available options, and connect with verified university peers. The application emphasizes trust and safety through verification systems, user ratings, and university-specific features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool

**UI System:** Shadcn UI component library (New York style) with Radix UI primitives
- Material Design-inspired system with university-focused customizations
- Mobile-first responsive design (primary target: mobile devices)
- Theme system supporting light and dark modes via Context API
- Custom color palette emphasizing trust (university blue) and safety (green verification indicators)

**Routing:** Wouter for client-side routing
- Dashboard, view requests/invites, create requests/invites, verification, and settings pages

**State Management:**
- TanStack React Query for server state management and caching
- React Context for theme management
- Local component state with React hooks

**Styling:** Tailwind CSS with custom design tokens
- CSS variables for theming
- Custom utility classes for elevation effects (hover-elevate, active-elevate-2)
- Typography: Inter font family from Google Fonts

**Key Design Principles:**
- Trust & Safety First: Visual hierarchy emphasizes verification badges, ratings, and safety features
- Clarity Over Decoration: Clean, scannable layouts for quick decision-making
- Speed & Efficiency: Minimal clicks to core actions (raise request/invite)

### Backend Architecture

**Framework:** Express.js with TypeScript
- REST API architecture
- Middleware for JSON parsing, URL encoding, and request logging
- Custom error handling middleware
- Development-only Vite middleware integration

**API Structure:**
- `/api/carpool-requests` - CRUD operations for ride requests
- `/api/carpool-invites` - CRUD operations for ride invites
- `/api/stats` - Dashboard statistics endpoint

**Build System:**
- Development: tsx for TypeScript execution
- Production: esbuild for server bundling, Vite for client bundling

### Data Storage

**ORM:** Drizzle ORM with Zod schema validation

**Database:** PostgreSQL via Neon serverless driver
- Connection pooling through `@neondatabase/serverless`
- Schema-first approach with Drizzle Kit for migrations

**Data Models:**

1. **Users Table**
   - Authentication: username/password
   - Profile: full name, email, phone, university
   - Trust indicators: verification status, rating, rides completed
   - Member since timestamp

2. **Carpool Requests Table** (Students looking for rides)
   - Pickup location and destination
   - Date and time
   - Number of passengers needed
   - Optional notes
   - Status tracking (active/completed/cancelled)
   - User association (defaults to "anonymous")

3. **Carpool Invites Table** (Drivers offering rides)
   - Pickup location and destination
   - Date and time
   - Available seats
   - Optional notes
   - Status tracking (active/completed/cancelled)
   - User association (defaults to "anonymous")

**Schema Validation:** Drizzle-Zod integration for runtime type safety on inserts

### Authentication and Authorization

**Current Implementation:** Basic schema support for user authentication
- User table includes username/password fields
- No active authentication middleware (appears to be planned feature)
- Routes currently accept anonymous users (userId defaults to "anonymous")

**Future Consideration:** Session management scaffolding present (`connect-pg-simple` dependency suggests PostgreSQL session store planned)

### External Dependencies

**Database Service:**
- Neon serverless PostgreSQL (cloud-hosted)
- Connection via DATABASE_URL environment variable

**UI Components:**
- Radix UI primitives (20+ component packages)
- Shadcn UI component system (customizable, not a dependency)

**Development Tools:**
- Vite for HMR and development server
- Replit-specific plugins: runtime error overlay, cartographer (development mode only)

**Fonts:**
- Google Fonts (Inter font family)

**Key NPM Packages:**
- Form handling: react-hook-form with @hookform/resolvers
- Date utilities: date-fns
- Styling: class-variance-authority, clsx, tailwind-merge
- UI utilities: cmdk (command palette), embla-carousel-react
- Icons: lucide-react

**Runtime Requirements:**
- Node.js environment
- Environment variable: DATABASE_URL (required, throws error if missing)
- PostgreSQL database provisioned through Neon