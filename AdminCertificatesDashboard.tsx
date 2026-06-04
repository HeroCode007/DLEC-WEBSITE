import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Trash2, Download, CheckCircle, AlertCircle, Loader, RefreshCw, LogOut } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Certificate, ImportedCertificate, getCertStatus } from './certificateData';
import {
  fetchAllCertificates,
  importCertificatesToServer,
  deleteAllCertificates,
} from './certificateApi';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminCertificatesDashboard = () => {
  const [savedCerts, setSavedCerts] = useState<Certificate[]>([]);
  const [previewCerts, setPreviewCerts] = useState<ImportedCertificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverAvailable, setServerAvailable] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getToken, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSessionExpired = useCallback(() => {
    showMsg('error', 'Session expired. Please login again.', 3000);
    setTimeout(() => {
      logout();
      navigate('/admin/login');
    }, 1500);
  }, [logout, navigate]);

  const showMsg = (type: 'success' | 'error', text: string, duration = 5000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), duration);
  };

  const loadFromServer = useCallback(async () => {
    const token = getToken();
    if (!token) { handleSessionExpired(); return; }
    setLoading(true);
    try {
      const certs = await fetchAllCertificates(token);
      setSavedCerts(certs);
      setServerAvailable(true);
    } catch (err: any) {
      if (err?.message === 'UNAUTHORIZED') { handleSessionExpired(); return; }
      setServerAvailable(false);
      showMsg('error', 'Cannot reach the certificate server. Make sure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }, [getToken, handleSessionExpired]);

  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  // Parse an Excel file into ImportedCertificate rows (client-side only, no saving yet)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) fileInputRef.current.value = '';

    setLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target?.result, { type: 'array' });
        const sheet = workbook.Sheets['Sheet1'] || workbook.Sheets[workbook.SheetNames[0]];
        const rawData: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const certificates: ImportedCertificate[] = [];
        let current: Record<string, string> = {};
        // Column indices for the calibration data table (set when header row is detected)
        let calCols: { sv: number; ov: number; dv: number } | null = null;

        const norm = (s: unknown) =>
          String(s ?? '').trim().replace(/^['"]|['"]$/g, '').toLowerCase();
        const val = (s: unknown) =>
          String(s ?? '').trim().replace(/^['"]|['"]$/g, '').replace(/^:\s*/, '');

        const flush = () => {
          if (Object.keys(current).length === 0) return;
          const due = current['Calibration Due'] || current['Due Date'] || '';
          certificates.push({
            'Certificate #': current['Certificate #'] || '',
            Client: current['Client'] || '',
            'Model/Type': current['Model/Type'] || current['Equipment Type'] || '',
            'Data Sheet No.': current['Data Sheet No.'] || current['Datasheet'] || '',
            Manufacturer: current['Manufacturer'] || '',
            Temperature: current['Temperature'] || '',
            'Sr. No.': current['Sr. No.'] || current['Serial No.'] || '',
            'Calibration Date': current['Calibration Date'] || '',
            Code: current['Code'] || '',
            'Calibration Due': due,
            Location: current['Location'] || '',
            'Tag/ID': current['Tag/ID'] || current['Tag'] || '',
            'Calibrated at': current['Calibrated at'] || '',
            'STANDARD VALUE': current['STANDARD VALUE'] || '',
            'OBSERVED VALUE': current['OBSERVED VALUE'] || '',
            'DEVIATION VALUE': current['DEVIATION VALUE'] || '',
            TRACEABILITY: current['TRACEABILITY'],
            'CALIBRATED BY': current['CALIBRATED BY'],
            'CHECKED BY': current['CHECKED BY'],
          });
          current = {};
          calCols = null; // reset calibration table state for next certificate
        };

        const applyField = (label: string, value: string) => {
          if (!value) return;
          if (label.includes('certificate') && label.includes('#')) { flush(); current['Certificate #'] = value; }
          else if (label.includes('certificate') && (label.includes('no') || label.includes('num'))) { flush(); current['Certificate #'] = value; }
          else if (label === 'client') current['Client'] = value;
          else if (label.includes('client') && !label.includes('location')) current['Client'] = value;
          else if (label.includes('model') || (label.includes('equipment') && label.includes('type'))) current['Model/Type'] = value;
          else if (label.includes('data sheet') || label.includes('datasheet')) current['Data Sheet No.'] = value;
          else if (label.includes('manufacturer')) current['Manufacturer'] = value;
          else if (label.includes('temperature')) current['Temperature'] = value;
          else if (label.includes('sr.') || label.includes('sr ') || (label.includes('serial') && label.includes('no'))) current['Sr. No.'] = value;
          else if (label.includes('calibration date') && !label.includes('due')) current['Calibration Date'] = value;
          else if (label === 'code') current['Code'] = value;
          else if (label.includes('calibration due') || label.includes('due date')) current['Calibration Due'] = value;
          else if (label.includes('location')) current['Location'] = value;
          else if (label.includes('tag') && !label.includes('traceable')) current['Tag/ID'] = value;
          else if (label.includes('calibrated at')) current['Calibrated at'] = value;
          else if (label.includes('traceability') || label.includes('traceable')) current['TRACEABILITY'] = value;
          else if (label.includes('calibrated by')) current['CALIBRATED BY'] = value;
          else if (label.includes('checked by')) current['CHECKED BY'] = value;
        };

        for (let rowIdx = 0; rowIdx < rawData.length; rowIdx++) {
          const row = rawData[rowIdx];
          if (!row || row.length === 0) continue;

          const normRow = Array.from({ length: row.length }, (_, i) => norm(row[i]));

          // ── Detect calibration-data table header ──────────────────────────
          // Matches when a single row contains "standard", "observed", AND "deviation"
          // in separate cells (regardless of which columns they appear in).
          const svHeaderCol = normRow.findIndex(c => c.includes('standard') && c.length > 2);
          const ovHeaderCol = normRow.findIndex(c => (c.includes('observed') || c.includes('nominated')) && c.length > 2);
          const dvHeaderCol = normRow.findIndex(c => c.includes('deviation') && c.length > 2);

          if (svHeaderCol !== -1 && ovHeaderCol !== -1 && dvHeaderCol !== -1) {
            calCols = { sv: svHeaderCol, ov: ovHeaderCol, dv: dvHeaderCol };
            continue; // skip the header row itself
          }

          // ── Read calibration data rows (once inside the table) ────────────
          if (calCols) {
            const svRaw = String(row[calCols.sv] ?? '').trim();
            const ovRaw = String(row[calCols.ov] ?? '').trim();
            const dvRaw = String(row[calCols.dv] ?? '').trim();
            const svNum = parseFloat(svRaw);

            if (!isNaN(svNum) && svRaw !== '') {
              // Valid numeric calibration row — accumulate
              const append = (key: string, v: string) => {
                current[key] = current[key] ? current[key] + ',' + v : v;
              };
              append('STANDARD VALUE', svRaw);
              append('OBSERVED VALUE', ovRaw || '0');
              append('DEVIATION VALUE', dvRaw || '0');
              continue;
            }

            // Non-numeric row: exit calibration table only when we hit a known section label
            const col0 = normRow[0] || '';
            const isSectionLabel =
              col0.includes('traceability') ||
              col0.includes('calibrated by') ||
              col0.includes('checked by') ||
              (col0.includes('certificate') && col0.includes('#'));
            if (!isSectionLabel) continue; // unit row / empty row — skip but stay in table
            calCols = null; // fall through to key-value parsing
          }

          // ── Key-value parsing: scan ALL columns of the row ─────────────────
          // DLEC certificates have a two-column layout where metadata appears in
          // column pairs (left side: cols 0–1, right side: cols 3–5).
          // Scanning every cell finds both sides automatically.
          for (let ci = 0; ci < row.length; ci++) {
            const label = normRow[ci];
            if (!label || label.length < 2) continue;

            // Find value: next non-empty cell within 3 columns (same row)
            let value = '';
            let valueCol = ci;
            for (let j = ci + 1; j <= Math.min(ci + 3, row.length - 1); j++) {
              const rawCell = String(row[j] ?? '').trim();
              if (rawCell.startsWith(':')) { value = val(row[j]); valueCol = j; break; }
            }

            // CALIBRATED BY, CHECKED BY, TRACEABILITY: value may be on a later row
            // (the name appears below the heading/signature area in the certificate)
            if (!value && (label.includes('calibrated by') || label.includes('checked by') || label.includes('traceability'))) {
              for (let r2 = rowIdx + 1; r2 <= Math.min(rowIdx + 6, rawData.length - 1); r2++) {
                const v = val(rawData[r2]?.[ci]);
                if (v) { value = v; break; }
              }
            }

            applyField(label, value);

            // Advance past the value cell so we don't re-process it as a label
            if (valueCol > ci) ci = valueCol;
          }
        }
        flush();

        if (certificates.length === 0) {
          showMsg('error', `No certificates found in file. Parsed ${rawData.length} rows — check the Excel format.`);
        } else {
          setPreviewCerts(certificates);
          setShowPreview(true);
          showMsg('success', `Parsed ${certificates.length} certificate(s). Review below then click "Save to Database".`);
        }
      } catch (err) {
        showMsg('error', "Error reading Excel file. Make sure it's a valid .xlsx or .xls file.");
        console.error('Parse error:', err);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      showMsg('error', 'Error reading file.');
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const confirmAndSave = async () => {
    const token = getToken();
    if (!token) { handleSessionExpired(); return; }
    setLoading(true);
    try {
      const result = await importCertificatesToServer(previewCerts, token);
      showMsg(
        'success',
        `Saved ${result.imported} certificate(s) to database.` +
          (result.skipped > 0 ? ` ${result.skipped} skipped (missing certificate number).` : '')
      );
      setShowPreview(false);
      setPreviewCerts([]);
      await loadFromServer();
    } catch (err: any) {
      if (err?.message === 'UNAUTHORIZED') { handleSessionExpired(); return; }
      showMsg('error', 'Failed to save certificates. Is the server running on port 5000?');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure? This will permanently delete ALL certificates from the database.')) return;
    const token = getToken();
    if (!token) { handleSessionExpired(); return; }
    setLoading(true);
    try {
      await deleteAllCertificates(token);
      setSavedCerts([]);
      showMsg('success', 'All certificates deleted from database.');
    } catch (err: any) {
      if (err?.message === 'UNAUTHORIZED') { handleSessionExpired(); return; }
      showMsg('error', 'Failed to delete certificates.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const exportCurrentData = () => {
    if (savedCerts.length === 0) {
      showMsg('error', 'No certificates to export.');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(savedCerts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Certificates');
    XLSX.writeFile(wb, `dlec_certificates_backup_${new Date().toISOString().split('T')[0]}.xlsx`);
    showMsg('success', 'Certificates exported successfully!');
  };

  const statusColor = (status: string) => {
    if (status === 'Valid') return 'bg-green-100 text-green-800';
    if (status === 'Expired') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const validCount = savedCerts.filter((c) => getCertStatus(c.calibrationDue) === 'Valid').length;
  const expiredCount = savedCerts.filter((c) => getCertStatus(c.calibrationDue) === 'Expired').length;
  const pendingCount = savedCerts.filter((c) => getCertStatus(c.calibrationDue) === 'Pending').length;

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Certificate Management Dashboard</h1>
            <p className="text-xl text-gray-600">Import and manage calibration certificates in the DLEC database</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">
              Logged in as <strong className="text-gray-700">{user?.username}</strong>
            </span>
            <button
              onClick={loadFromServer}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Server Unavailable Warning */}
        {!serverAvailable && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
            <AlertCircle size={20} />
            <span>
              Certificate server is not reachable. Start it with{' '}
              <code className="bg-red-100 px-1 rounded font-mono text-sm">npm run server</code>{' '}
              from the project root, then click Refresh.
            </span>
          </div>
        )}

        {/* Toast Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Import Certificates from Excel</h2>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50">
            <Upload size={48} className="text-blue-600 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-2">Upload Your Excel File</p>
            <p className="text-gray-600 mb-6">Select an .xlsx or .xls file containing your certificates</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={loading}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? (
                <><Loader size={20} className="animate-spin" /> Processing...</>
              ) : (
                <><Upload size={20} /> Choose File</>
              )}
            </button>
          </div>
        </div>

        {/* Preview — shown after Excel is parsed, before saving */}
        {showPreview && previewCerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Preview — {previewCerts.length} Certificate{previewCerts.length !== 1 ? 's' : ''}
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Certificate #</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Model/Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Calibration Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {previewCerts.slice(0, 10).map((cert, i) => {
                    const status = getCertStatus(cert['Calibration Due']);
                    return (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-blue-700">{cert['Certificate #']}</td>
                        <td className="py-3 px-4">{cert.Client}</td>
                        <td className="py-3 px-4">{cert['Model/Type']}</td>
                        <td className="py-3 px-4">{cert['Calibration Date']}</td>
                        <td className="py-3 px-4">{cert['Calibration Due']}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {previewCerts.length > 10 && (
              <p className="text-gray-600 text-sm mb-6">
                … and {previewCerts.length - 10} more certificate{previewCerts.length - 10 !== 1 ? 's' : ''}
              </p>
            )}
            <div className="flex gap-4">
              <button
                onClick={confirmAndSave}
                disabled={loading}
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                Save to Database
              </button>
              <button
                onClick={() => { setShowPreview(false); setPreviewCerts([]); }}
                disabled={loading}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Database Statistics */}
        {savedCerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Database Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Certificates</p>
                <p className="text-3xl font-bold text-blue-700">{savedCerts.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Valid</p>
                <p className="text-3xl font-bold text-green-700">{validCount}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Expired</p>
                <p className="text-3xl font-bold text-red-700">{expiredCount}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-700">{pendingCount}</p>
              </div>
            </div>

            {/* Certificate List */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Certificate #</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Equipment Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Calibration Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {savedCerts.map((cert, i) => {
                    const status = getCertStatus(cert.calibrationDue);
                    return (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-blue-700">{cert['Certificate #']}</td>
                        <td className="py-3 px-4">{cert.client}</td>
                        <td className="py-3 px-4">{cert.equipmentType}</td>
                        <td className="py-3 px-4">{cert.calibrationDate}</td>
                        <td className="py-3 px-4">{cert.calibrationDue}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={exportCurrentData}
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2"
              >
                <Download size={20} /> Export as Excel
              </button>
              <button
                onClick={handleClearAll}
                disabled={loading}
                className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <Trash2 size={20} /> Clear All
              </button>
            </div>
          </div>
        )}

        {/* Excel Format Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Excel File Format</h3>
          <p className="text-blue-800 mb-4">
            The Excel file should use two columns: <strong>Label</strong> | <strong>Value</strong>.
            Each certificate's fields appear as consecutive rows. A new certificate block starts
            when the label <code className="bg-white px-1 rounded font-mono text-sm">Certificate #</code> is encountered.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Required Fields:</h4>
              <ul className="text-blue-800 space-y-2">
                {['Certificate #', 'Client', 'Model/Type', 'Data Sheet No.', 'Manufacturer',
                  'Temperature', 'Sr. No.', 'Calibration Date', 'Code', 'Calibration Due'].map((f) => (
                  <li key={f}>✓ <span className="font-mono bg-white px-2 py-1 rounded text-sm">{f}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Optional Fields:</h4>
              <ul className="text-blue-800 space-y-2">
                {['Location', 'Tag/ID', 'Calibrated at', 'TRACEABILITY', 'CALIBRATED BY',
                  'CHECKED BY', 'STANDARD VALUE', 'OBSERVED VALUE', 'DEVIATION VALUE'].map((f) => (
                  <li key={f}>• <span className="font-mono bg-white px-2 py-1 rounded text-sm">{f}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificatesDashboard;
