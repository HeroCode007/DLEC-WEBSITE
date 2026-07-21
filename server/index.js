import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLoginHandler, authMiddleware } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, 'data', 'certificates.json');

const app = express();

// ── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false, // Vite dev server handles CSP
}));
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── Rate Limiting ───────────────────────────────────────────────────────────

// Strict rate limit for login endpoint (brute-force protection)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // 5 attempts per window
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General rate limit for all API routes
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,                 // 100 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

// ── Data Helpers ────────────────────────────────────────────────────────────

const loadCertificates = async () => {
  try {
    const data = await readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveCertificates = async (certificates) => {
  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(certificates, null, 2), 'utf-8');
};

// Normalises an uploaded Excel row (ImportedCertificate) or an already-stored
// Certificate into the canonical Certificate shape used by the frontend.
// Safe to call on data in any format — handles both Excel field names and
// camelCase field names so old and new imports both display correctly.
const toCertificateFormat = (raw, fallbackId) => {
  const calibrationData = (() => {
    // Already a proper array (hardcoded entries or re-normalised data)
    if (Array.isArray(raw.calibrationData) && raw.calibrationData.length > 0) {
      return raw.calibrationData;
    }
    // Comma-separated multi-row values accumulated by the Excel parser
    const sv = String(raw['STANDARD VALUE'] || '').trim();
    const ov = String(raw['OBSERVED VALUE'] || '').trim();
    const dv = String(raw['DEVIATION VALUE'] || '').trim();
    if (!sv && !ov && !dv) return [];

    const svArr = sv ? sv.split(',') : [];
    const ovArr = ov ? ov.split(',') : [];
    const dvArr = dv ? dv.split(',') : [];
    const len = Math.max(svArr.length, ovArr.length, dvArr.length);

    return Array.from({ length: len }, (_, i) => ({
      standardValue: parseFloat(svArr[i] ?? '0') || 0,
      observedValue: parseFloat(ovArr[i] ?? '0') || 0,
      deviationValue: parseFloat(dvArr[i] ?? '0') || 0,
    }));
  })();

  return {
    id: raw.id || String(fallbackId),
    'Certificate #': (raw['Certificate #'] || '').trim(),
    equipmentType: raw.equipmentType || raw['Model/Type'] || '',
    client: raw.client || raw.Client || '',
    dataSheetNo: raw.dataSheetNo || raw['Data Sheet No.'] || '',
    calibrationDate: raw.calibrationDate || raw['Calibration Date'] || '',
    calibrationDue: raw.calibrationDue || raw['Calibration Due'] || '',
    temperature: raw.temperature || raw.Temperature || '',
    location: raw.location || raw.Location || '',
    calibratedBy: raw.calibratedBy || raw['CALIBRATED BY'] || 'N/A',
    checkedBy: raw.checkedBy || raw['CHECKED BY'] || 'N/A',
    traceability: raw.traceability || raw.TRACEABILITY || 'N/A',
    manufacturer: raw.manufacturer || raw.Manufacturer || '',
    srNo: raw.srNo || raw['Sr. No.'] || '',
    code: raw.code || raw.Code || '',
    calibrationData,
    isValid: true,
  };
};

// ── Authentication Routes ───────────────────────────────────────────────────

// POST /api/auth/login — public login endpoint (rate-limited)
app.post('/api/auth/login', loginLimiter, createLoginHandler());

// GET /api/auth/verify — verify if current token is still valid
app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, user: { username: req.adminUser.sub, role: req.adminUser.role } });
});

// GET /api/certificates/public/:certNumber — public lookup endpoint for QR scanners
app.get('/api/certificates/public/:certNumber', async (req, res) => {
  const certNo = (req.params.certNumber || '').trim().toUpperCase();
  if (!certNo) return res.status(400).json({ error: 'Certificate number required' });

  const rawList = await loadCertificates();
  const certs = rawList.map((c, i) => toCertificateFormat(c, i + 1));
  const found = certs.find((c) => (c['Certificate #'] || '').trim().toUpperCase() === certNo);

  if (!found) {
    return res.status(404).json({ found: false, message: 'Certificate not found in database' });
  }

  res.json({ found: true, certificate: found });
});

// ── Protected Admin Routes (Auth Required) ──────────────────────────────────

// GET /api/certificates/all  — admin: list every certificate in the database
app.get('/api/certificates/all', authMiddleware, async (req, res) => {
  const certificates = await loadCertificates();
  res.json(certificates.map((c, i) => toCertificateFormat(c, i + 1)));
});

// POST /api/certificates/import  — admin: bulk upsert from Excel upload
app.post('/api/certificates/import', authMiddleware, async (req, res) => {
  const incoming = req.body;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return res.status(400).json({ error: 'Expected a non-empty array of certificates' });
  }

  const existing = await loadCertificates();
  const map = new Map(existing.map((c) => [c['Certificate #']?.toUpperCase(), c]));

  let imported = 0;
  let skipped = 0;

  incoming.forEach((raw) => {
    const certNum = (raw['Certificate #'] || '').trim();
    if (!certNum) { skipped++; return; }

    const key = certNum.toUpperCase();
    const prev = map.get(key);
    const formatted = toCertificateFormat(raw, map.size + 1);

    map.set(key, prev ? { ...prev, ...formatted, id: prev.id } : formatted);
    imported++;
  });

  const merged = Array.from(map.values());
  await saveCertificates(merged);
  res.json({ imported, skipped, total: merged.length });
});

// DELETE /api/certificates/:id  — admin: remove a single certificate by ID
app.delete('/api/certificates/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const rawList = await loadCertificates();
  const certs = rawList.map((c, i) => toCertificateFormat(c, i + 1));
  
  const filtered = certs.filter((c) => String(c.id) !== String(id));
  if (filtered.length === certs.length) {
    return res.status(404).json({ error: 'Certificate not found' });
  }

  await saveCertificates(filtered);
  res.json({ message: 'Certificate deleted successfully', total: filtered.length });
});

// DELETE /api/certificates  — admin: remove all certificates
app.delete('/api/certificates', authMiddleware, async (req, res) => {
  await saveCertificates([]);
  res.json({ message: 'All certificates deleted' });
});

// ── Health Check ────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`DLEC certificate server running on http://localhost:${PORT}`);

  // Warn if auth is not configured
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
    console.warn('\n⚠️  Admin authentication is NOT configured!');
    console.warn('   Run: npm run setup-admin\n');
  } else {
    console.log(`✅ Admin auth configured for user: ${process.env.ADMIN_USERNAME}`);
  }
});
