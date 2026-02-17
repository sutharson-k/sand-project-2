Sandify Project – Code Explanation (Summary)

Overview
- This project is now a Vite + React frontend with a Convex backend.
- The UI is preserved from the original HTML/CSS/JS by embedding the legacy markup and script.
- Authentication uses Convex Auth with Google OAuth and email/password.
- Data (sand types, dealers, trucks, orders, profiles, applications) is stored in Convex.

Frontend

index.html
- Entry point for Vite. Loads fonts, Font Awesome, and the legacy styles, then mounts React at #root.

src/main.tsx
- Creates Convex client using VITE_CONVEX_URL.
- Wraps the app in ConvexAuthProvider so auth + data queries work.

src/App.tsx
- Loads legacy HTML (src/legacy.html) into the page.
- Injects public/app.js once and bridges Convex functions to the legacy script via window.
- Handles auth state and writes user data to localStorage for the legacy UI.
- Opens location modal after login if no location is set.
- Opens profile setup modal after login if phone is missing.
- Exposes these window helpers for legacy JS:
  - __convexAuthSignIn / __convexAuthSignOut
  - __convexSignInWithPassword / __convexSignUpWithPassword
  - __convexSetPrefs / __convexSaveProfile
  - __convexCreateOrder / __convexUpdateOrderStatus
  - __convexSubmitSellerApp / __convexSubmitTransportApp

src/legacy.html
- Original HTML layout for Sandify, including all sections, pages, modals.
- Contains login/signup modal, location modal, profile setup modal, seller forms.

public/styles.css
- Original styling for the UI.

public/app.js (Legacy UI Logic)
- All UI behavior: navigation, catalog, dealer selection, transport, order flow.
- Google OAuth button hooks are in App.tsx; email/password hooks are in app.js.
- Uses Convex when available, otherwise localStorage fallback.
- Key functions:
  - useCurrentLocation(): browser geolocation + OSM reverse geocoding.
  - confirmLocation(): saves location locally + to Convex.
  - processPayment(): creates order number, stores order in Convex.
  - simulateTracking(): updates order status and pushes to Convex.
  - handleSupplierSubmit / handleTransportSubmit: submit applications to Convex.

Backend (Convex)

convex/schema.ts
- Defines tables:
  - authTables (Convex Auth)
  - sandTypes (with imageStorageId for Convex File Storage)
  - dealers
  - trucks
  - orders (orderNumber, names, status)
  - userPrefs (location + theme)
  - userProfiles (name/email/phone)
  - sellerApplications (pending review)
  - transportApplications (pending review)

convex/auth.ts
- Convex Auth config: Password provider + Google OAuth.

convex/auth.config.ts
- Convex OIDC config. Only includes Convex provider settings (required by Convex Auth).

convex/http.ts
- Adds Convex Auth HTTP routes (OAuth callbacks, JWKS, etc.).

convex/users.ts
- viewer: returns logged-in user data.
- profile: returns stored profile details (name/email/phone).
- upsertProfile: saves profile details.
- setPrefs / getPrefs: saves location + theme.

convex/sand.ts
- listSandTypes / listSandTypesWithUrls (storage URLs).
- seedSandTypes / seedDealers / seedTrucks (seed data).
- listDealers / listTrucks.
- createOrder: saves order + schedules server-side status updates.
- updateOrderStatus: update status from client or server.
- advanceOrderStatus (internal): scheduled status changes.

convex/images.ts
- generateUploadUrl: for Convex File Storage.
- attachSandImage: link uploaded image to sand type.

scripts/upload_images.mjs
- Seeds sand types, dealers, trucks.
- Uploads images from public/images to Convex storage.
- Attaches storage IDs to sand types.

run.bat
- Starts Vite dev server with npm.
- Opens http://localhost:5173.
- Auto-installs dependencies if missing.

Environment
- .env contains VITE_CONVEX_URL for frontend.
- Convex env vars include GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SITE_URL, JWT keys.

Notes
- For Google OAuth, the redirect URI must be:
  https://intent-moose-161.eu-west-1.convex.site/api/auth/callback/google
- If using ngrok or a tunnel, add that URL to Google OAuth and update Convex SITE_URL.

How to run
1) npm install
2) npx convex dev
3) npm run dev

