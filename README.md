# DLEC WEBSITE

This is a React-based website.

## Backend certificate database

A minimal backend server lives in `server/` and serves certificate data from `server/data/certificates.json`.

### Run locally

1. Install frontend dependencies from the root:
   ```bash
   npm install
   ```
2. Install backend dependencies:
   ```bash
   npm install --prefix server
   ```
3. Start the backend server:
   ```bash
   npm run server
   ```
4. In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

The frontend proxies `/api` calls to `http://localhost:5000`.

