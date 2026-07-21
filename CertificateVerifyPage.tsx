import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Printer,
  Search,
  CheckCircle2,
  Calendar,
  Building,
  Wrench,
  Thermometer,
  FileText,
  Home,
  Loader,
} from 'lucide-react';
import { Certificate, getCertStatus } from './certificateData';
import { fetchPublicCertificate } from './certificateApi';

const WHATSAPP_NUMBER = '923214182021';
const CONTACT_EMAIL = 'mail.dlec@gmail.com';

const CertificateVerifyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const certNumberFromUrl = searchParams.get('cert') || searchParams.get('no') || '';

  const [inputCertNo, setInputCertNo] = useState(certNumberFromUrl);
  const [loading, setLoading] = useState(false);
  const [certData, setCertData] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [notFoundMsg, setNotFoundMsg] = useState('');

  const performLookup = async (queryNo: string) => {
    if (!queryNo.trim()) return;
    setLoading(true);
    setSearched(true);
    setNotFoundMsg('');

    try {
      const res = await fetchPublicCertificate(queryNo);
      if (res.found && res.certificate) {
        setCertData(res.certificate);
      } else {
        setCertData(null);
        setNotFoundMsg(res.message || 'No matching certificate record found in DLEC database.');
      }
    } catch {
      setCertData(null);
      setNotFoundMsg('Could not connect to verification server. You can still request manual verification below.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (certNumberFromUrl) {
      setInputCertNo(certNumberFromUrl);
      performLookup(certNumberFromUrl);
    }
  }, [certNumberFromUrl]);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCertNo.trim()) return;
    setSearchParams({ cert: inputCertNo.trim() });
    performLookup(inputCertNo.trim());
  };

  const activeCertNo = certData ? certData['Certificate #'] : (inputCertNo || certNumberFromUrl);
  const certStatus = certData ? getCertStatus(certData.calibrationDue) : 'Pending';

  const waText = encodeURIComponent(
    `Please verify my calibration certificate:\nCertificate #: ${activeCertNo}\n\nIssued by DLEC (Direct Line Engineering Corporation)`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  const emailSubject = encodeURIComponent(`Certificate Verification - ${activeCertNo}`);
  const emailBody = encodeURIComponent(
    `Dear DLEC Team,\n\nI would like to verify the following certificate:\n\nCertificate #: ${activeCertNo}\n\nPlease confirm its authenticity and validity.\n\nThank you.`
  );
  const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col justify-between p-4 sm:p-6 lg:p-12 print:bg-white print:p-0">
      
      {/* Header Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between mb-8 print:hidden">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800">
          <Home size={18} />
          Back to DLEC Main Website
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <Printer size={16} />
          Print Verification Report
        </button>
      </div>

      <div className="max-w-4xl w-full mx-auto space-y-6">
        
        {/* Main Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 text-center print:shadow-none print:border-none">
          <img
            src="https://i.postimg.cc/yNv6qThw/dleclogo.png"
            alt="DLEC Logo"
            className="h-16 mx-auto mb-4 object-contain"
          />
          
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield size={16} className="text-blue-700" />
            <span>ISO 9001:2015 Certified Calibration Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Certificate Verification System
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Direct Line Engineering Corporation — Proactive Calibration Vendor
          </p>

          {/* Search Bar */}
          <form onSubmit={handleManualSearch} className="mt-6 max-w-lg mx-auto flex gap-2 print:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Enter Certificate Number (e.g. DLEC-2026-001)"
                value={inputCertNo}
                onChange={(e) => setInputCertNo(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              {loading ? <Loader className="animate-spin" size={16} /> : 'Verify'}
            </button>
          </form>
        </div>

        {/* Verification Results View */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
            <Loader size={40} className="animate-spin mx-auto text-blue-700 mb-4" />
            <p className="text-base font-semibold text-gray-700">Verifying certificate in DLEC database...</p>
          </div>
        ) : certData ? (
          /* Verified Certificate Details */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-6 print:shadow-none">
            
            {/* Status Banner */}
            <div className={`p-5 rounded-2xl border flex items-center justify-between ${
              certStatus === 'Valid' ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className="flex items-center gap-3">
                {certStatus === 'Valid' ? (
                  <ShieldCheck size={36} className="text-green-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle size={36} className="text-red-600 flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-lg font-bold">
                    {certStatus === 'Valid' ? 'Authentic & Valid Certificate' : 'Certificate Expired'}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Official record found in DLEC ISO 9001:2015 database repository.
                  </p>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                certStatus === 'Valid' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {certStatus}
              </span>
            </div>

            {/* General Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                <FileText className="text-blue-700 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Certificate Number</p>
                  <p className="text-base font-mono font-bold text-blue-700">{certData['Certificate #']}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                <Building className="text-blue-700 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Client / Company Name</p>
                  <p className="text-base font-bold text-gray-900">{certData.client || 'N/A'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                <Wrench className="text-blue-700 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Equipment Type / Model</p>
                  <p className="font-semibold text-gray-800">{certData.equipmentType || 'N/A'}</p>
                  <p className="text-xs text-gray-500">Sr No: {certData.srNo || 'N/A'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                <Calendar className="text-blue-700 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Calibration Validity Dates</p>
                  <p className="font-semibold text-gray-800">Calibrated: {certData.calibrationDate || 'N/A'}</p>
                  <p className="text-xs font-bold text-blue-700">Due Date: {certData.calibrationDue || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Multi-Row Calibration Matrix Table */}
            {certData.calibrationData && certData.calibrationData.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Thermometer size={18} className="text-blue-700" />
                  Calibration Parameter Matrix
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-xs text-left text-gray-700">
                    <thead className="bg-blue-900 text-white uppercase font-bold">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Standard Value</th>
                        <th className="p-3">Observed Value</th>
                        <th className="p-3">Deviation Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {certData.calibrationData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 font-mono">
                          <td className="p-3 font-bold text-gray-500">{idx + 1}</td>
                          <td className="p-3 font-semibold text-blue-700">{row.standardValue}</td>
                          <td className="p-3 text-gray-900">{row.observedValue}</td>
                          <td className="p-3 text-gray-600">{row.deviationValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Inspector Traceability Signatures */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
              <div>
                <p className="text-gray-400 uppercase font-bold">Calibrated By</p>
                <p className="font-semibold text-gray-800">{certData.calibratedBy || 'DLEC Certified Engineer'}</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase font-bold">Checked By</p>
                <p className="font-semibold text-gray-800">{certData.checkedBy || 'Quality Manager'}</p>
              </div>
            </div>

          </div>
        ) : (
          /* Not Found / Manual Verification Prompt */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 text-center space-y-4 print:shadow-none">
            {searched && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-sm text-left flex items-start gap-3">
                <AlertTriangle className="text-amber-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-bold">Manual Verification Required</p>
                  <p className="text-xs text-amber-700">{notFoundMsg}</p>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600">
              To verify certificate authenticity directly with DLEC Technical Support, use the direct WhatsApp or Email buttons below. Both options pre-fill your certificate number.
            </p>
          </div>
        )}

        {/* Contact Actions */}
        <div className="grid sm:grid-cols-2 gap-4 print:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-semibold text-base transition-colors shadow-lg"
          >
            <MessageCircle size={22} />
            Verify via WhatsApp
          </a>
          <a
            href={emailUrl}
            className="flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-2xl font-semibold text-base transition-colors shadow-lg"
          >
            <Mail size={22} />
            Verify via Official Email
          </a>
        </div>

        <p className="text-center text-xs text-gray-400 pt-4">
          Direct Line Engineering Corporation (DLEC) — ISO 9001:2015 Certified Calibration Vendor, Lahore, Pakistan
        </p>

      </div>
    </div>
  );
};

export default CertificateVerifyPage;
