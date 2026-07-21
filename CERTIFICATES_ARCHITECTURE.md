# Certificates Architecture & Data Ingestion Specification

This document details the end-to-end architecture, security model, and data pipeline of the **DLEC Certificate Verification & Calibration Platform**.

---

## 1. High-Level Data Architecture

The DLEC Calibration Platform uses a centralized data model backed by a secure Express server and file-based JSON database storage with real-time REST API synchronization.

```
┌───────────────────────────┐      ┌─────────────────────────────┐
│  Admin Excel Upload (.xlsx)│ ───> │ Client-Side Parser (XLSX)  │
└───────────────────────────┘      └─────────────────────────────┘
                                                  │
                                                  ▼
┌───────────────────────────┐      ┌─────────────────────────────┐
│ Express Server (/import)  │ <─── │ JWT Authenticated API Post  │
└───────────────────────────┘      └─────────────────────────────┘
              │
              ▼
┌───────────────────────────┐      ┌─────────────────────────────┐
│ Data Normalizer & Matrix  │ ───> │ server/data/certificates.json│
└───────────────────────────┘      └─────────────────────────────┘
                                                  │
                                                  ▼
┌───────────────────────────┐      ┌─────────────────────────────┐
│ Public Lookup API & QR    │ <─── │ React Verification Frontend │
└───────────────────────────┘      └─────────────────────────────┘
```

---

## 2. Data Ingestion & Normalization Pipeline

### Excel Schema Mapping
When an admin uploads an Excel datasheet, the system ingests rows and maps legacy headers to a canonical JSON schema:

| Excel Field Name | Canonical Property | Notes |
| :--- | :--- | :--- |
| `Certificate #` | `Certificate #` | Primary key for QR code generation & search |
| `Client` / `CLIENT` | `client` | Client company name |
| `Model/Type` / `Equipment Type` | `equipmentType` | Calibration equipment model |
| `Data Sheet No.` | `dataSheetNo` | Internal reference datasheet number |
| `Calibration Date` | `calibrationDate` | Format: `DD-MM-YYYY` |
| `Calibration Due` / `Due Date` | `calibrationDue` | Format: `DD-MM-YYYY` |
| `Temperature` | `temperature` | Lab ambient temperature |
| `Location` | `location` | Site or laboratory location |
| `STANDARD VALUE` | `calibrationData[].standardValue` | Multi-row standard calibration values |
| `OBSERVED VALUE` | `calibrationData[].observedValue` | Multi-row measured values |
| `DEVIATION VALUE` | `calibrationData[].deviationValue` | Multi-row calculated deviation |

### Multi-Row Calibration Matrix Normalization
Excel datasheets with comma-separated calibration data are transformed on the backend via `toCertificateFormat`:
```javascript
const svArr = sv ? sv.split(',') : [];
const ovArr = ov ? ov.split(',') : [];
const dvArr = dv ? dv.split(',') : [];
const len = Math.max(svArr.length, ovArr.length, dvArr.length);

return Array.from({ length: len }, (_, i) => ({
  standardValue: parseFloat(svArr[i] ?? '0') || 0,
  observedValue: parseFloat(ovArr[i] ?? '0') || 0,
  deviationValue: parseFloat(dvArr[i] ?? '0') || 0,
}));
```

---

## 3. Security & Authentication Architecture

### JWT Authentication
- **Token Generation**: Admin authentication (`POST /api/auth/login`) issues a signed JWT token with a 1-hour expiration.
- **Password Protection**: Passwords are saved as standard `bcryptjs` hashes.
- **Constant-Time Verification**: Username comparison uses constant-time logic to mitigate timing attacks.

### Rate Limiting & Defense
- **Login Endpoint**: Protected by `express-rate-limit` allowing maximum **5 attempts per 15 minutes**.
- **Public & Admin API**: General rate limiter allowing maximum **100 requests per minute**.
- **HTTP Security Headers**: Express app uses `helmet` middleware for HTTP header hardening.

---

## 4. API Specification

| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | `POST` | Public (Rate-Limited) | Authenticates admin credentials and returns JWT token |
| `/api/auth/verify` | `GET` | Admin (JWT Required) | Validates active session token |
| `/api/certificates/all` | `GET` | Admin (JWT Required) | Returns full array of registered certificates |
| `/api/certificates/public/:certNo` | `GET` | Public (Rate-Limited) | Returns public verification sheet for QR code scanning |
| `/api/certificates/import` | `POST` | Admin (JWT Required) | Bulk upserts normalized certificates array |
| `/api/certificates/:id` | `DELETE` | Admin (JWT Required) | Deletes specific certificate by ID |
| `/api/certificates` | `DELETE` | Admin (JWT Required) | Clears all certificate records |

---

## 5. QR Code & Verification Workflow

1. **QR Code Formatting**: Each certificate registered in the admin dashboard generates a QR code URL pointing to:
   `https://dlec.com/certificate?cert=DLEC-2026-001`
2. **Dynamic Client Resolution**: When scanned by a customer, `CertificateVerifyPage.tsx` queries `GET /api/certificates/public/DLEC-2026-001`.
3. **Verification Badge**:
   - Displays **Green Authentic Seal** if certificate exists and `calibrationDue` date is valid.
   - Displays **Red Expiry Warning** if certificate is past due date.
   - Displays **Direct Contact Fallback** via pre-filled WhatsApp/Email if certificate is pending manual verification.
