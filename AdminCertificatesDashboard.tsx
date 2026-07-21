import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Trash2,
  Download,
  CheckCircle,
  AlertCircle,
  Loader,
  RefreshCw,
  LogOut,
  QrCode,
  Search,
  Filter,
  Eye,
  X,
  FileSpreadsheet,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
} from 'lucide-react';
import QRCode from 'qrcode';
import * as XLSX from 'xlsx';
import { Certificate, ImportedCertificate, getCertStatus } from './certificateData';
import {
  fetchAllCertificates,
  importCertificatesToServer,
  deleteAllCertificates,
  deleteSingleCertificate,
} from './certificateApi';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminCertificatesDashboard = () => {
  const [savedCerts, setSavedCerts] = useState<Certificate[]>([]);
  const [previewCerts, setPreviewCerts] = useState<ImportedCertificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverAvailable, setServerAvailable] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Dashboard 2.0 State Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Valid' | 'Expired' | 'Pending'>('All');
  const [qrModalCert, setQrModalCert] = useState<Certificate | null>(null);
  const [qrModalDataUrl, setQrModalDataUrl] = useState<string>('');

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

  const showMsg = (type: 'success' | 'error' | 'warning', text: string, duration = 5000) => {
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

  // Handle Excel file upload and parsing
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
        let calCols: { sv: number; ov: number; dv: number } | null = null;

        const norm = (s: unknown) => String(s ?? '').trim().replace(/^['"]|['"]$/g, '').toLowerCase();
        const val = (s: unknown) => String(s ?? '').trim().replace(/^['"]|['"]$/g, '').replace(/^:\s*/, '');

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
          calCols = null;
        };

        const applyField = (label: string, value: string) => {
          if (!value) return;
          if (label.includes('certificate') && (label.includes('#') || label.includes('no') || label.includes('num'))) { flush(); current['Certificate #'] = value; }
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

          const svHeaderCol = normRow.findIndex(c => c.includes('standard') && c.length > 2);
          const ovHeaderCol = normRow.findIndex(c => (c.includes('observed') || c.includes('nominated')) && c.length > 2);
          const dvHeaderCol = normRow.findIndex(c => c.includes('deviation') && c.length > 2);

          if (svHeaderCol !== -1 && ovHeaderCol !== -1 && dvHeaderCol !== -1) {
            calCols = { sv: svHeaderCol, ov: ovHeaderCol, dv: dvHeaderCol };
            continue;
          }

          if (calCols) {
            const svCell = val(row[calCols.sv]);
            const ovCell = val(row[calCols.ov]);
            const dvCell = val(row[calCols.dv]);

            const looksLikeNum = (s: string) => s !== '' && !isNaN(Number(s.replace(/,/g, '')));
            if (looksLikeNum(svCell) || looksLikeNum(ovCell) || looksLikeNum(dvCell)) {
              current['STANDARD VALUE'] = current['STANDARD VALUE'] ? `${current['STANDARD VALUE']},${svCell}` : svCell;
              current['OBSERVED VALUE'] = current['OBSERVED VALUE'] ? `${current['OBSERVED VALUE']},${ovCell}` : ovCell;
              current['DEVIATION VALUE'] = current['DEVIATION VALUE'] ? `${current['DEVIATION VALUE']},${dvCell}` : dvCell;
              continue;
            }
          }

          let matchedTwoCol = false;
          for (let i = 0; i < row.length - 1; i++) {
            const labelStr = norm(row[i]);
            const valueStr = val(row[i + 1]);
            if (labelStr && valueStr) {
              applyField(labelStr, valueStr);
              matchedTwoCol = true;
              break;
            }
          }
          if (matchedTwoCol) continue;

          for (let i = 0; i < row.length; i++) {
            const cell = String(row[i] ?? '').trim();
            const colonIdx = cell.indexOf(':');
            if (colonIdx > 0) {
              const labelStr = norm(cell.slice(0, colonIdx));
              const valueStr = val(cell.slice(colonIdx + 1));
              applyField(labelStr, valueStr);
            }
          }
        }
        flush();

        if (certificates.length === 0) {
          showMsg('error', 'No valid certificates found in the file. Check the format below.');
        } else {
          setPreviewCerts(certificates);
          setShowPreview(true);
          showMsg('success', `Parsed ${certificates.length} certificate(s). Review below and click "Save to Server".`);
        }
      } catch {
        showMsg('error', 'Failed to parse Excel file. Make sure it is a valid .xlsx or .xls file.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSaveToServer = async () => {
    const token = getToken();
    if (!token) { handleSessionExpired(); return; }
    if (previewCerts.length === 0) return;

    setLoading(true);
    try {
      const res = await importCertificatesToServer(previewCerts, token);
      showMsg('success', `Successfully imported ${res.imported} certificate(s) to server database.`);
      setPreviewCerts([]);
      setShowPreview(false);
      await loadFromServer();
    } catch (err: any) {
      if (err?.message === 'UNAUTHORIZED') { handleSessionExpired(); return; }
      showMsg('error', 'Failed to save certificates to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSingle = async (cert: Certificate) => {
    if (!window.confirm(`Are you sure you want to delete certificate ${cert['Certificate #']}?`)) return;
    const token = getToken();
    if (!token) { handleSessionExpired(); return; }

    setLoading(true);
    try {
      await deleteSingleCertificate(cert.id, token);
      showMsg('success', `Certificate ${cert['Certificate #']} deleted successfully.`);
      await loadFromServer();
    } catch (err: any) {
      if (err?.message === 'UNAUTHORIZED') { handleSessionExpired(); return; }
      showMsg('error', 'Failed to delete certificate.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('WARNING: Are you sure you want to delete ALL saved certificates from the server? This action cannot be undone.')) {
      return;
    }
    const token = getToken();
    if (!token) { handleSessionExpired(); return; }

    setLoading(true);
    try {
      await deleteAllCertificates(token);
      setSavedCerts([]);
      showMsg('success', 'All certificates deleted from server.');
    } catch (err: any) {
      if (err?.message === 'UNAUTHORIZED') { handleSessionExpired(); return; }
      showMsg('error', 'Failed to clear certificates from server.');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = async (certNum: string) => {
    try {
      const origin = window.location.origin;
      const verifyUrl = `${origin}/certificate?cert=${encodeURIComponent(certNum)}`;
      const dataUrl = await QRCode.toDataURL(verifyUrl, { width: 350, margin: 2 });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `QR-${certNum}.png`;
      link.click();
      showMsg('success', `Downloaded QR code for ${certNum}`);
    } catch {
      showMsg('error', 'Failed to generate QR code.');
    }
  };

  const openQrModal = async (cert: Certificate) => {
    try {
      const origin = window.location.origin;
      const verifyUrl = `${origin}/certificate?cert=${encodeURIComponent(cert['Certificate #'])}`;
      const dataUrl = await QRCode.toDataURL(verifyUrl, { width: 400, margin: 2 });
      setQrModalCert(cert);
      setQrModalDataUrl(dataUrl);
    } catch {
      showMsg('error', 'Failed to generate QR code preview.');
    }
  };

  const exportCurrentData = () => {
    if (savedCerts.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(savedCerts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Certificates');
    XLSX.writeFile(wb, `DLEC_Certificates_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    showMsg('success', 'Exported certificates to Excel file.');
  };

  // Filtered Certificates Array
  const filteredCerts = savedCerts.filter((cert) => {
    const status = getCertStatus(cert.calibrationDue);
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      cert['Certificate #'].toLowerCase().includes(query) ||
      cert.client.toLowerCase().includes(query) ||
      cert.equipmentType.toLowerCase().includes(query) ||
      cert.srNo.toLowerCase().includes(query) ||
      cert.location.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // Calculate Stat Counter Badges
  const totalCount = savedCerts.length;
  const validCount = savedCerts.filter((c) => getCertStatus(c.calibrationDue) === 'Valid').length;
  const expiredCount = savedCerts.filter((c) => getCertStatus(c.calibrationDue) === 'Expired').length;
  const pendingCount = savedCerts.filter((c) => getCertStatus(c.calibrationDue) === 'Pending').length;

  const statusColor = (status: 'Valid' | 'Expired' | 'Pending') => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Expired': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Navigation Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="https://i.postimg.cc/yNv6qThw/dleclogo.png" alt="DLEC Logo" className="h-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DLEC Calibration Dashboard 2.0</h1>
              <p className="text-sm text-gray-500">ISO 9001:2015 Certificate & Calibration Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadFromServer}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Sync Server
            </button>
            <button
              onClick={() => { logout(); navigate('/admin/login'); }}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              Logout ({user?.username})
            </button>
          </div>
        </div>

        {/* Server Connection Alert */}
        {!serverAvailable && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <p className="font-semibold text-sm">Certificate Server Offline</p>
              <p className="text-xs text-red-600">Start the backend server on port 5000 using <code className="bg-red-100 px-1 rounded">npm start</code>.</p>
            </div>
          </div>
        )}

        {/* Toast Messages */}
        {message && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 shadow-md transition-all ${
            message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-red-600" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Dashboard 2.0 Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg flex items-center gap-4">
            <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl">
              <Layers size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Total Certificates</p>
              <p className="text-3xl font-extrabold text-gray-900">{totalCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg flex items-center gap-4">
            <div className="p-4 bg-green-50 text-green-700 rounded-2xl">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Valid & Active</p>
              <p className="text-3xl font-extrabold text-green-600">{validCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg flex items-center gap-4">
            <div className="p-4 bg-red-50 text-red-700 rounded-2xl">
              <AlertCircle size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Expired Due Date</p>
              <p className="text-3xl font-extrabold text-red-600">{expiredCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg flex items-center gap-4">
            <div className="p-4 bg-yellow-50 text-yellow-700 rounded-2xl">
              <Calendar size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Pending Review</p>
              <p className="text-3xl font-extrabold text-yellow-600">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* Excel Import Card */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileSpreadsheet className="text-blue-700" size={24} />
                Bulk Import Datasheet
              </h2>
              <p className="text-sm text-gray-500">Upload an Excel (.xlsx / .xls) file containing calibration datasheets.</p>
            </div>

            <label className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-md">
              <Upload size={18} />
              Choose Excel File
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>

          {/* Import Preview Section */}
          {showPreview && previewCerts.length > 0 && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Import Preview ({previewCerts.length} items)</h3>
                <button
                  onClick={handleSaveToServer}
                  disabled={loading}
                  className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  {loading ? <Loader className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                  Save to Server
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-xs text-left text-gray-700">
                  <thead className="bg-gray-50 border-b border-gray-200 uppercase font-semibold text-gray-600">
                    <tr>
                      <th className="p-3">Cert #</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Equipment</th>
                      <th className="p-3">Cal. Date</th>
                      <th className="p-3">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {previewCerts.slice(0, 5).map((c, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-3 font-mono font-bold text-blue-700">{c['Certificate #']}</td>
                        <td className="p-3">{c.Client}</td>
                        <td className="p-3">{c['Model/Type']}</td>
                        <td className="p-3">{c['Calibration Date']}</td>
                        <td className="p-3">{c['Calibration Due']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Saved Certificates Management Table 2.0 */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
          
          {/* Controls Bar: Search & Status Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Building className="text-blue-700" size={24} />
                Registered Certificates ({filteredCerts.length})
              </h2>
              <p className="text-sm text-gray-500">Live search and certificate status management.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search Cert #, Client, Model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-xl pl-9 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {(['All', 'Valid', 'Expired', 'Pending'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === st ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Display */}
          {filteredCerts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <AlertCircle size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-base font-semibold">No certificates match your search filters.</p>
              <p className="text-xs text-gray-400 mt-1">Try clearing your search query or uploading a new Excel file.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                  <tr>
                    <th className="py-3.5 px-4">Certificate #</th>
                    <th className="py-3.5 px-4">Client Name</th>
                    <th className="py-3.5 px-4">Equipment Model</th>
                    <th className="py-3.5 px-4">Cal Date</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCerts.map((cert) => {
                    const status = getCertStatus(cert.calibrationDue);
                    return (
                      <tr key={cert.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{cert['Certificate #']}</td>
                        <td className="py-3.5 px-4 font-medium text-gray-900">{cert.client}</td>
                        <td className="py-3.5 px-4 text-gray-600">{cert.equipmentType}</td>
                        <td className="py-3.5 px-4 text-gray-600">{cert.calibrationDate}</td>
                        <td className="py-3.5 px-4 text-gray-600">{cert.calibrationDue}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openQrModal(cert)}
                              title="Preview QR Code Modal"
                              className="p-2 text-gray-600 hover:text-blue-700 bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => downloadQR(cert['Certificate #'])}
                              title="Download QR Sticker PNG"
                              className="p-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <QrCode size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteSingle(cert)}
                              title="Delete Certificate"
                              className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <button
              onClick={exportCurrentData}
              disabled={savedCerts.length === 0}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Download size={18} /> Export Catalog (.xlsx)
            </button>

            <button
              onClick={handleClearAll}
              disabled={loading || savedCerts.length === 0}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Trash2 size={18} /> Clear Database
            </button>
          </div>
        </div>

      </div>

      {/* QR Code Modal Preview */}
      {qrModalCert && qrModalDataUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setQrModalCert(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="inline-flex p-3 bg-blue-50 text-blue-700 rounded-2xl mb-4">
                <QrCode size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Verification QR Code</h3>
              <p className="text-xs text-gray-500 mb-6 font-mono font-bold text-blue-700">{qrModalCert['Certificate #']}</p>

              <div className="bg-gray-50 p-6 rounded-2xl inline-block border border-gray-200 mb-6 shadow-inner">
                <img src={qrModalDataUrl} alt="QR Code" className="w-56 h-56 mx-auto" />
              </div>

              <div className="text-left text-xs bg-blue-50/50 p-4 rounded-xl space-y-1.5 mb-6 border border-blue-100">
                <p><strong>Client:</strong> {qrModalCert.client}</p>
                <p><strong>Equipment:</strong> {qrModalCert.equipmentType}</p>
                <p><strong>Cal Date:</strong> {qrModalCert.calibrationDate} | <strong>Due:</strong> {qrModalCert.calibrationDue}</p>
              </div>

              <button
                onClick={() => downloadQR(qrModalCert['Certificate #'])}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Download size={18} /> Download High-Res PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificatesDashboard;
