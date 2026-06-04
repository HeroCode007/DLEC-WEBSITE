import { Certificate, ImportedCertificate } from './certificateData';

const API_BASE = '/api';

/**
 * Public API — no authentication required
 */
export const fetchCertificate = async (certificateNumber: string): Promise<Certificate | null> => {
  const url = `${API_BASE}/certificates?number=${encodeURIComponent(certificateNumber)}`;
  const response = await fetch(url);

  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Certificate server error');

  return (await response.json()) as Certificate;
};

/**
 * Admin API — requires authentication token
 */

const authHeaders = (token: string): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
});

export const fetchAllCertificates = async (token: string): Promise<Certificate[]> => {
  const response = await fetch(`${API_BASE}/certificates/all`, {
    headers: authHeaders(token),
  });

  if (response.status === 401) throw new Error('UNAUTHORIZED');
  if (!response.ok) throw new Error('Failed to fetch certificates from server');
  return response.json();
};

export const importCertificatesToServer = async (
  certificates: ImportedCertificate[],
  token: string
): Promise<{ imported: number; skipped: number; total: number }> => {
  const response = await fetch(`${API_BASE}/certificates/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(certificates),
  });

  if (response.status === 401) throw new Error('UNAUTHORIZED');
  if (!response.ok) throw new Error('Failed to import certificates to server');
  return response.json();
};

export const deleteAllCertificates = async (token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/certificates`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (response.status === 401) throw new Error('UNAUTHORIZED');
  if (!response.ok) throw new Error('Failed to delete certificates');
};
