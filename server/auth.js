import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * DLEC Admin Authentication Module
 * 
 * Provides JWT-based authentication for admin routes.
 * - POST /api/auth/login  → validates credentials, returns JWT
 * - authMiddleware         → Express middleware to protect admin routes
 */

// ── Login Route Handler ─────────────────────────────────────────────────────

export const createLoginHandler = () => {
  return async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminUsername || !adminPasswordHash || !jwtSecret) {
      console.error('Auth environment variables not configured. Run: npm run setup-admin');
      return res.status(500).json({ error: 'Server authentication not configured' });
    }

    // Constant-time comparison for username (prevent timing attacks)
    const usernameMatch = username.toLowerCase() === adminUsername.toLowerCase();

    // bcrypt.compare is inherently constant-time
    const passwordMatch = await bcrypt.compare(password, adminPasswordHash);

    if (!usernameMatch || !passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        sub: adminUsername,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000)
      },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      expiresIn: 3600, // 1 hour in seconds
      user: { username: adminUsername, role: 'admin' }
    });
  };
};

// ── Auth Middleware ──────────────────────────────────────────────────────────

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.slice(7); // Remove 'Bearer '

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET not configured');
    return res.status(500).json({ error: 'Server authentication not configured' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    
    // Verify the token has admin role
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    req.adminUser = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};
