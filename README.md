# DLEC Calibration Platform (DLEC-WEBSITE 2.0)

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20%7C%20TypeScript-blue.svg)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Express%20%7C%20Node.js-green.svg)](https://expressjs.com/)
[![Security](https://img.shields.io/badge/Security-JWT%20%7C%20Bcrypt%20%7C%20Helmet-orange.svg)](https://jwt.io/)
[![Certification](https://img.shields.io/badge/ISO-9001%3A2015%20Certified-purple.svg)](https://dlec.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

> **Direct Line Engineering Corporation (DLEC)** — ISO 9001:2015 Certified Proactive Calibration Vendor in Lahore, Pakistan. Serving premier industrial clients with traceable, high-accuracy calibration services.

---

## 📸 Overview

**DLEC Calibration Platform 2.0** is an end-to-end web application and digital certificate verification suite designed for high-precision industrial calibration services. It combines an ultra-modern React frontend with an Express API backend, secure JWT authentication, Excel bulk data ingestion, dynamic QR code verification, and a showcase of **35+ Eminent Corporate Clients**.

---

## ✨ Features Matrix

- 🔬 **ISO 9001:2015 Calibration Services**: Comprehensive coverage across Temperature, Pressure, Scales, Sound, Light, Flow, Electrical, Force, and Glassware calibration.
- 🏢 **Eminent Customers Showcase**: Interactive showcase featuring 35+ major corporate partners (PepsiCo, Coca-Cola, GSK, Atlas Honda, Descon, NLC, FWO, Sapphire, Treet, Haleeb Foods, Mughal Steel, etc.).
- 📊 **Admin Certificates Dashboard 2.0**:
  - Live statistical counter cards (Total Certificates, Active Equipment, Expired Equipment, Pending Items).
  - Multi-field keyword searching and status filter pills.
  - Client-side Excel (`.xlsx`) bulk upload and data normalizer.
  - Individual record deletion and single-click QR sticker generator.
  - Data export capabilities (Excel and JSON backups).
- 🔒 **Express & JWT Security Engine**:
  - Secure bcrypt password hashing and token-based admin session state.
  - `express-rate-limit` brute-force protection (5 login attempts per 15 mins).
  - Helmet security headers and CORS protection.
- 📱 **QR Code Verification & Public Lookup**:
  - Direct QR scanning route (`/certificate?cert=...`) returning instant verification badges.
  - Calibration matrix parameter table display.
  - Pre-filled WhatsApp & Email verification links.
  - `@media print` official ISO report stylesheet.

---

## 🛠️ Tech Stack & Dependencies

### Frontend
- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS & Lucide Icons
- **Animations**: Framer Motion & AOS (Animate on Scroll)
- **Data & QR**: `xlsx` parser, `qrcode` generator, `react-router-dom` v7

### Backend Server (`server/`)
- **Runtime**: Node.js & Express (ES Modules)
- **Authentication**: `jsonwebtoken`, `bcryptjs`
- **Security**: `helmet`, `express-rate-limit`, `cors`
- **Database**: Local JSON persistence (`server/data/certificates.json`)

---

## ⚡ Quick Start & Development Setup

### 1. Prerequisites
- Node.js (`v18+` recommended)
- npm (`v9+`)

### 2. Environment Setup
Copy the environment template files:

```bash
# Root environment
cp .env.example .env

# Server environment
cp server/.env.example server/.env
```

Set up admin credentials using the configuration wizard:
```bash
npm run setup-admin --prefix server
```

### 3. Install Dependencies
Install dependencies for both frontend and backend in a single step:

```bash
npm install
npm install --prefix server
```

### 4. Unified Launch Command (Single Command)
Run both Vite frontend (`:5173`) and Express backend (`:5000`) concurrently:

```bash
npm start
```
*Alternatively, you can run `npm run dev:all`.*

---

## 📂 Project Directory Hierarchy

```
DLEC-WEBSITE/
├── CERTIFICATES_ARCHITECTURE.md   # Architectural & data pipeline specification
├── README.md                      # Repository overview & setup guide (this file)
├── .env.example                   # Root environment template
├── package.json                   # Project scripts & dependencies
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite bundler configuration
│
├── server/                        # Express API Server
│   ├── .env.example               # Backend environment template
│   ├── index.js                   # Main Express application & API endpoints
│   ├── auth.js                    # JWT authentication & rate limiting middleware
│   ├── setup-admin.js             # Interactive CLI admin setup wizard
│   ├── package.json               # Server dependencies
│   └── data/                      # JSON data persistence directory
│       └── certificates.json
│
├── public/                        # Static web assets
│   └── dleclogo.png
│
└── src/ (Root TSX Components)
    ├── App.tsx                    # Main router & app wrapper
    ├── main.tsx                   # React entry point
    ├── index.css                  # Global styles & Tailwind imports
    │
    ├── Header.tsx                 # Site header & navigation bar
    ├── Footer.tsx                 # Site footer & contact info
    ├── HomePage.tsx               # Homepage with services & client marquee
    ├── AboutPage.tsx              # About DLEC & client gallery grid
    ├── ContactPage.tsx            # Contact form & location map
    ├── EminentCustomersSection.tsx# 35+ Client brands showcase component
    │
    ├── AdminLoginPage.tsx         # Secure admin login interface
    ├── AdminCertificatesDashboard.tsx # Admin dashboard 2.0
    ├── CertificateVerifyPage.tsx  # Dynamic public certificate verification page
    │
    ├── AuthContext.tsx            # Auth context provider & JWT management
    ├── ProtectedRoute.tsx         # Auth guard for admin routes
    ├── certificateApi.ts          # API client for server communication
    └── certificateData.ts         # TypeScript interfaces & status helpers
```

---

## 📄 Architecture & Documentation

For comprehensive technical documentation regarding Excel data normalization, JWT security architecture, and QR code verification workflows, read **[CERTIFICATES_ARCHITECTURE.md](CERTIFICATES_ARCHITECTURE.md)**.

---

## 🛡️ License

Proprietary — All rights reserved by **Direct Line Engineering Corporation (DLEC)**.
