Deploying the backend to Render
================================

This repository contains a Node/Express backend and a static frontend published on GitHub Pages.
GitHub Pages can only serve static files (frontend). To make the full app work (frontend -> backend -> MongoDB)
you must deploy the backend to a Node host. Render is a simple, free-friendly option.

Quick steps (Render)
--------------------
1. Create an account on https://render.com and connect your GitHub account.
2. Click "New" -> "Web Service" and choose this repository (`ex8`).
3. Branch: `master` (or your preferred branch).
4. Build command: leave empty or use `npm install` (Render runs install automatically).
5. Start command: `node server.js` (a `Procfile` is included at the repo root: `web: node server.js`).
6. Add environment variables in the Render dashboard (Environment > Environment Variables):
   - `MONGODB_URI` — your MongoDB Atlas connection string (rotate the password first if it was previously committed).
   - `PORT` — generally Render sets this automatically; you don't need to set it.
7. Deploy. Once deployed Render will give you a URL like `https://your-service.onrender.com`.

Configure the frontend
----------------------
- In `public/index.html`, add a script before the `script.js` include to set the API base URL. Example:

  <script>window.API_BASE = 'https://your-service.onrender.com';</script>
  <script src="script.js"></script>

- After adding that, publish the `public/` folder again to GitHub Pages (I can do this for you) so the frontend will call the deployed backend.

Important security steps
------------------------
- Rotate the MongoDB user's password in Atlas immediately (the `.env` file was tracked previously and may have exposed credentials).
- If you want me to scrub the `.env` from git history, I can — but this rewrites history and requires force-push. Confirm before I proceed.

CORS
----
The backend uses `cors()` in `server.js` which allows all origins by default. If you prefer to restrict it, set the options to allow the Pages origin (e.g. `https://afna-fathima.github.io`) and your Render URL.

If you'd like, I can: 
- Create a `render.yaml` for Render's spec (optional),
- Push the `window.API_BASE` update to the frontend and re-publish GitHub Pages to immediately point at the deployed backend,
- Or walk you through the Render UI step-by-step.

Tell me which of the above you'd like me to do next and I'll continue.
