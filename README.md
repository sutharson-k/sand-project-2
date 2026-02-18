# Sandify (Sand Project 2)

Sandify is a simple marketplace website for ordering construction materials (sand, aggregates, gravel, red soil, etc.).
It connects buyers, suppliers, and transporters in one place.

If you are not technical, this README explains everything in plain words.

## What this website does (plain English)

- Buyers can browse sand types and place orders.
- Suppliers can apply to list their materials.
- Transporters can apply to deliver orders.
- Orders are tracked with statuses (processing -> loading -> delivering -> delivered).

The website is a frontend + backend project:
- The frontend is the website you see in the browser.
- The backend (Convex) stores data, handles logins, and manages orders.

## Tech used (short version)

- Vite + React (frontend)
- Convex (backend + database + auth)
- Google login + email/password
- ngrok (share your local site)

You do not need to learn all this to run it.

## How to run it (easy steps)

1) Open a terminal in the project folder:

   ```bash
   cd C:\Users\Admin\Desktop\w
   ```

2) Start the app:

   ```bash
   run.bat
   ```

That is it.
The site runs on http://localhost:5173 and ngrok shares it publicly.

## Login options

- Email + password
- Google sign-in (popup)

## Data and images

- Sand types, dealers, and trucks are stored in Convex.
- Images are in `public/images` and can also be uploaded to Convex storage.
- If you want to seed data and upload images:

  ```bash
  node scripts/upload_images.mjs
  ```

## Where things live (simple map)

- `src/` - React app shell and Convex wiring
- `public/` - legacy UI (app.js, styles.css, images)
- `convex/` - backend functions, schema, auth
- `run.bat` - starts Vite + Convex + ngrok

## Notes

- If Google login does not work, check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your Convex env.
- If ngrok does not work, run it manually or update `run.bat`.

