# SKUL Frontend Architecture

## Overview

SKUL is a Next.js App Router application written in JSX. The `app/` directory owns route composition and the existing URLs. Reusable presentation lives in `components/`, while frontend service contracts and temporary implementations live in `lib/`.

The visual system is defined in `app/globals.css`. Preserve its existing SKUL tokens and restrained institutional styling when adding features.

## Project boundaries

- `app/`: route entry points and page composition. Avoid placing large datasets or reusable business workflows here.
- `components/layout/`: authenticated application shell, navigation, sidebar, and top bar.
- `components/ui/`: reusable authenticated UI primitives.
- `components/`: public marketing components and existing feature components. New feature-specific components should stay grouped by feature where practical.
- `lib/services/`: stable frontend contracts used by UI code. This is the backend handoff boundary.
- `lib/mock/`: temporary data and mock implementations. Mock files must be clearly named and must not be imported directly by page or feature UI when a service contract exists.
- `lib/`: frontend-only utilities such as validation, image references, and compatibility helpers.
- `public/`: static assets.

## Data flow

The intended flow is:

```text
Route page -> feature component -> lib/services -> lib/mock
Route page -> feature component -> lib/services -> API/backend (future)
```

A backend integration should replace the implementation inside `lib/services/` or add the API client used there. Components should continue to consume the same returned data shape wherever possible.

Current service contracts include:

- `lib/services/examinations.js`
- `lib/services/attendance.js`
- `lib/services/assignments.js`
- `lib/services/documents.js`
- `lib/services/complaints.js`
- `lib/services/profile.js`
- `lib/services/timetable.js`

No backend endpoints or database schemas are assumed by these contracts.

The current mock records behind these contracts include examinations, attendance,
assignments, documents, complaints, profile, and timetable data. They are temporary
development fixtures and are not authoritative backend records.

## Shared UI

The authenticated shell uses `components/ui/Button.jsx` and `components/ui/Card.jsx`. The public marketing site uses `components/Button.jsx` because it has a different link/variant API and visual role. Do not merge these APIs solely to reduce file count.

Shared layout components are `Sidebar`, `Topbar`, and `MobileBottomNav`. Feature-specific components should receive data and callbacks through props rather than importing mock records directly.

## Authentication boundary

`app/login/page.jsx` and `lib/validation.js` are locked. Do not modify, move, rename, or replace them during frontend feature work. Authentication/session middleware or provider configuration belongs to the backend/authentication owner. No second authentication system should be introduced here.

## Adding a feature

1. Add or preserve the route under `app/`.
2. Put reusable feature UI under the relevant feature component folder.
3. Put temporary records under `lib/mock/`.
4. Expose reads and mutations through `lib/services/`.
5. Keep loading, error, and empty states explicit in the feature UI.
6. Preserve the existing JSX conventions, routes, design tokens, and responsive behavior.
7. Run `npm run lint` and `npm run build` before handoff.

Do not place database logic, credentials, or imagined API endpoints in components.
