import { Certificate, ImportedCertificate } from './certificateData';

const API_BASE = '/api';

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

export const fetchPublicCertificate = async (
  certNumber: string
): Promise<{ found: boolean; certificate?: Certificate; message?: string }> => {
  const encoded = encodeURIComponent(certNumber.trim());
  const response = await fetch(`${API_BASE}/certificates/public/${encoded}`);

  if (response.status === 404) {
    return { found: false, message: 'Certificate not found' };
  }

  if (!response.ok) {
    throw new Error('Failed to fetch certificate from server');
  }

  return response.json();
};

export const deleteSingleCertificate = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/certificates/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (response.status === 401) throw new Error('UNAUTHORIZED');
  if (!response.ok) throw new Error('Failed to delete certificate');
};

export const deleteAllCertificates = async (token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/certificates`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (response.status === 401) throw new Error('UNAUTHORIZED');
  if (!response.ok) throw new Error('Failed to delete certificates');
};
