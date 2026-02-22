# Sandify (Sand Project 2)

A full‑stack marketplace for construction sand that connects buyers, verified suppliers, and transport providers. Built with a Vite + React frontend and a Convex backend, Sandify supports authentication, catalog browsing, ordering, and live status tracking with an admin approval flow.

## Highlights

- Buyer ordering flow with pricing, delivery window, and tracking updates
- Supplier and transporter onboarding with document uploads
- Seller listings, inventory availability, and transporter fleet management
- Admin approvals, audit logs, and operational dashboards
- Convex Auth (Google + email/password)

## Tech Stack

- Frontend: Vite + React
- Backend: Convex (database, server functions, auth)
- Auth: Convex Auth with Google + email/password
- Tooling: ngrok for public tunneling during local dev

## Local Development

1) Install dependencies

```bash
npm install
```

2) Start Convex

```bash
npx convex dev
```

3) Start the frontend (Vite)

```bash
npm run dev
```

Or use the convenience script:

```bash
run.bat
```

## Environment Variables

Frontend
- `VITE_CONVEX_URL` (set in `.env`)

Convex (dashboard env)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SITE_URL`
- JWT/OIDC keys (as required by Convex Auth)

## Data Seeding & Images

Seed sand types, dealers, trucks, and upload images:

```bash
node scripts/upload_images.mjs
```

## Project Structure

- `src/` React app shell and Convex wiring
- `public/` legacy UI assets (`app.js`, `styles.css`, images)
- `convex/` Convex schema and server functions
- `scripts/` data seeding and utilities
- `run.bat` local dev runner (Vite + ngrok)

## Features in Detail

- Catalog browsing with dealer selection and transport choices
- Pricing engine with distance and delivery window modifiers
- Order lifecycle tracking with status timeline
- Reviews and notifications
- Multi‑location user profiles
- Quote requests for bulk/custom orders
- Partner dashboards (seller + transporter)
- Admin panel for approvals and audits
- Partner document uploads with size/type validation and progress feedback
- Role-based admin access via `userRoles` (no hardcoded emails)

## License

Proprietary. All rights reserved.
