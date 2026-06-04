import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthUser {
  username: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'dlec_admin_token';
const TOKEN_EXPIRY_KEY = 'dlec_admin_token_expiry';
const USER_KEY = 'dlec_admin_user';

// Check if a stored token is still valid (not expired)
const isTokenValid = (): boolean => {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiry) return false;
  return Date.now() < parseInt(expiry, 10);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for existing valid token
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (!token || !isTokenValid()) {
        // Token missing or expired — clear everything
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        localStorage.removeItem(USER_KEY);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      // Verify token with the server
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setUser(data.user || (storedUser ? JSON.parse(storedUser) : null));
        } else {
          // Token is invalid on server side
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(TOKEN_EXPIRY_KEY);
          localStorage.removeItem(USER_KEY);
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch {
        // Server unreachable — trust local token expiry
        if (storedUser) {
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      // Store token with expiry
      const expiryTime = Date.now() + (data.expiresIn * 1000);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiryTime));
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setIsAuthenticated(true);
      setUser(data.user);

      return { success: true };
    } catch {
      return { success: false, error: 'Cannot reach the server. Make sure it is running.' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const getToken = useCallback(() => {
    if (!isTokenValid()) {
      // Token expired — auto logout
      logout();
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
