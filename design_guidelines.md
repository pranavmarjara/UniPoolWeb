# University Carpool App - Design Guidelines

## Design Approach

**Selected Framework**: Material Design-inspired system with university-focused customizations
**Rationale**: Utility-focused application requiring clear data presentation, trust indicators, and mobile-first design for student users.

## Core Design Principles

1. **Trust & Safety First**: Visual hierarchy emphasizes verification badges, user ratings, and safety features
2. **Clarity Over Decoration**: Clean, scannable layouts for quick decision-making
3. **Mobile-Priority**: Students primarily use mobile devices - desktop is secondary
4. **Speed & Efficiency**: Minimal clicks to core actions (raise request/invite)

## Color Palette

### Light Mode
- **Primary**: 220 85% 55% (University blue - trust and professionalism)
- **Primary Hover**: 220 85% 45%
- **Secondary**: 140 60% 50% (Green - safety/verified indicators)
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Text Primary**: 220 20% 15%
- **Text Secondary**: 220 15% 45%
- **Border**: 220 15% 85%
- **Warning**: 35 95% 55% (Unverified users)
- **Error**: 0 85% 60%

### Dark Mode
- **Primary**: 220 85% 65%
- **Primary Hover**: 220 85% 55%
- **Secondary**: 140 55% 55%
- **Background**: 220 20% 10%
- **Surface**: 220 18% 14%
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 220 10% 65%
- **Border**: 220 15% 25%
- **Warning**: 35 90% 60%
- **Error**: 0 80% 65%

## Typography

- **Font Family**: 'Inter', 'system-ui', sans-serif (via Google Fonts)
- **Headings**: Font weights 600-700, sizes 2xl-4xl
- **Body**: Font weight 400, size base (16px)
- **Small Text**: Font weight 400-500, size sm
- **Emphasis**: Font weight 600 for key data (departure times, seat counts)

## Layout System

**Spacing Primitives**: Tailwind units of 2, 3, 4, 6, 8, 12, 16
- Consistent padding: p-4 (cards), p-6 (sections), p-8 (containers)
- Vertical rhythm: space-y-4 for lists, space-y-6 for sections
- Component gaps: gap-4 for grids, gap-3 for inline elements

**Container Strategy**:
- Max width: max-w-7xl for dashboard
- Cards: max-w-md for forms, max-w-2xl for detail views
- Mobile: Full-width with px-4 padding

## Component Library

### Navigation
- **Hamburger Menu**: Persistent on mobile, collapsible sidebar on desktop (lg:w-64)
- **Theme Toggle**: Sun/moon icons (top-right), smooth transition
- **Navigation Items**: Icon + label, active state with primary color accent
- **Header**: Sticky top bar with logo, theme toggle, user avatar

### Request/Invite Cards
- **Layout**: Grid on desktop (md:grid-cols-2 lg:grid-cols-3), stack on mobile
- **Card Content**:
  - User avatar + verification badge (top-left)
  - Route: Pickup → Destination with map pin icons
  - DateTime with clock icon
  - Available seats badge (bottom-right)
  - Star rating (5-star display)
- **Card Actions**: Primary CTA button + secondary details link
- **Visual Treatment**: Subtle shadow, hover lift effect, border accent for verified users

### Forms (Raise Request/Invite)
- **Layout**: Single-column, max-w-2xl centered
- **Fields**: 
  - Location inputs with map icon prefix
  - Date/time pickers with calendar/clock icons
  - Seat counter with +/- buttons
  - Notes textarea (optional details)
- **Validation**: Inline error messages, red border on error
- **Submit**: Full-width primary button at bottom

### Safety & Trust Indicators
- **Verification Badge**: Green checkmark icon, always visible on verified users
- **Rating Display**: Star icons with numerical rating (4.8/5.0)
- **Trust Signals**: 
  - "Verified Student" label
  - Ride completion count
  - Member since date
- **Unverified Warning**: Amber badge with caution icon

### Dashboard Layout
- **Hero Section**: Welcome banner with quick stats (requests this week, rides completed)
- **Action Cards**: 2x2 grid with primary actions (Raise Request, Raise Invite, View Requests, View Invites)
- **Recent Activity**: Timeline of latest requests/invites
- **Quick Filters**: Horizontal pill buttons (Today, This Week, Near Me)

### Settings Page
- **Sections**: Profile, Verification, Notifications, Preferences, Safety
- **Toggle Switches**: For notifications and preferences
- **Verification Status**: Card showing verification progress with steps
- **Theme Preference**: Radio buttons or toggle

## Accessibility

- **Dark Mode**: Consistent implementation across all components including form inputs
- **Contrast Ratios**: WCAG AA compliant (4.5:1 for text)
- **Focus States**: Visible ring on interactive elements
- **Icon Labels**: Alt text for all icons, aria-labels for icon buttons
- **Keyboard Navigation**: Full keyboard accessibility

## Images

**No hero images** - This is a utility-focused dashboard application. Use icons and illustrations instead:
- Empty states: Simple line illustrations (no rides available)
- Location previews: Small map thumbnails in cards
- User avatars: Circular photos with verification overlay

## Interaction Patterns

- **Loading States**: Skeleton screens for card grids, spinner for actions
- **Empty States**: Friendly illustrations with CTA to raise request/invite
- **Confirmation Modals**: For critical actions (cancel ride)
- **Toast Notifications**: Success/error feedback (top-right)
- **Animations**: Minimal - only smooth theme transitions and card hover lifts

## Mobile Considerations

- **Bottom Navigation**: Optional sticky bottom bar for quick actions on mobile
- **Touch Targets**: Minimum 44px height for all interactive elements
- **Swipe Actions**: Swipe to reveal actions on request/invite cards
- **Collapsible Filters**: Accordion pattern for filter options on mobile

This design system balances trust, efficiency, and safety while maintaining visual appeal appropriate for a university student audience.