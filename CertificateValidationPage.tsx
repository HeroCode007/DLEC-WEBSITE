import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Clock, Building2, Calendar, User, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { isExpired, Certificate } from './certificateData';
import { fetchCertificate } from './certificateApi';

const CertificateValidationPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setInputError('');

    if (!searchInput.trim()) {
      setInputError('Please enter a certificate number.');
      return;
    }

    setSearched(true);
    setNotFound(false);
    setResult(null);
    setLoading(true);

    try {
      const cert = await fetchCertificate(searchInput.trim());
      if (cert) {
        setResult(cert);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      setErrorMessage('Unable to reach the certificate database. Please try again later.');
      console.error('Certificate fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchInput('');
    setResult(null);
    setSearched(false);
    setNotFound(false);
    setInputError('');
    setErrorMessage('');
  };

  const expired = result ? isExpired(result.calibrationDue) : false;

  return (
    <div className="pt-16">
      <Helmet>
        <title>Verify Calibration Certificate Online | DLEC Pakistan</title>
        <meta
          name="description"
          content="Validate the authenticity of DLEC calibration certificates online. Enter your certificate number to verify calibration records and trace standard compliance."
        />
        <link rel="canonical" href="https://dlec.com/verify-certificate" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Certificate <span className="text-blue-700">Validation</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verify the authenticity and details of your DLEC calibration certificate. Enter your
              certificate number to access complete calibration data and traceability information.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Enter Certificate Number
                </label>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value.toUpperCase());
                    if (inputError) setInputError('');
                  }}
                  placeholder="e.g., DLEC/CAL/50846"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                    inputError ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {inputError ? (
                  <p className="text-xs text-red-600 mt-2">{inputError}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-2">Example format: DLEC/CAL/50846</p>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Search size={20} />
                  {loading ? 'Validating...' : 'Validate Certificate'}
                </button>
                {searched && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              {errorMessage && (
                <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-yellow-900">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {searched && !loading && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {notFound ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-12 text-center">
                <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h3>
                <p className="text-gray-600 mb-6">
                  No certificate found with number &ldquo;{searchInput}&rdquo;. Please verify the
                  certificate number and try again.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Try Another Search
                </button>
              </div>
            ) : result ? (
              <div className="space-y-8">
                {/* Status Banner */}
                <div
                  className={`rounded-2xl p-8 text-white ${
                    expired
                      ? 'bg-gradient-to-r from-red-600 to-red-700'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {expired ? <AlertCircle size={48} /> : <CheckCircle size={48} />}
                    <div>
                      <h2 className="text-3xl font-bold mb-2">
                        {expired ? 'Certificate Expired' : 'Certificate Valid'}
                      </h2>
                      <p className="text-lg opacity-90">
                        {result.calibrationDue && result.calibrationDue !== 'N/A'
                          ? expired
                            ? `This certificate expired on ${result.calibrationDue}`
                            : `Valid until ${result.calibrationDue}`
                          : 'Calibration due date not available'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <FileText className="text-blue-700" /> Certificate Information
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Certificate Number</label>
                        <p className="text-lg font-bold text-gray-900">{result['Certificate #']}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Equipment Type</label>
                        <p className="text-lg font-bold text-gray-900">{result.equipmentType}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Data Sheet No.</label>
                        <p className="text-lg font-bold text-gray-900">{result.dataSheetNo || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Equipment Code</label>
                        <p className="text-lg font-bold text-gray-900">{result.code || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Building2 className="text-purple-700" /> Client & Service Info
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Client</label>
                        <p className="text-lg font-bold text-gray-900">{result.client}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
                        <p className="text-lg font-bold text-gray-900">{result.location || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Temperature</label>
                        <p className="text-lg font-bold text-gray-900">{result.temperature || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Manufacturer</label>
                        <p className="text-lg font-bold text-gray-900">{result.manufacturer || 'Not Specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates & Traceability */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <Calendar size={18} /> Calibration Date
                    </h4>
                    <p className="text-2xl font-bold text-blue-700">{result.calibrationDate}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h4 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                      <Clock size={18} /> Due Date
                    </h4>
                    <p className="text-2xl font-bold text-purple-700">{result.calibrationDue}</p>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-6 border border-gray-300">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Traceability</h4>
                    <p className="text-sm text-gray-700 font-semibold">{result.traceability}</p>
                  </div>
                </div>

                {/* Personnel */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-300">
                    <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <User size={18} /> Calibrated By
                    </h4>
                    <p className="text-lg font-bold text-blue-700">{result.calibratedBy}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-300">
                    <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                      <User size={18} /> Checked By
                    </h4>
                    <p className="text-lg font-bold text-purple-700">{result.checkedBy}</p>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Security Notice:</strong> This calibration certificate is authentic and has
                    been issued by DLEC (Direct Line Engineering Corporation). Certificates without
                    proper signature, stamp &amp; seal will not be valid. If you have any concerns
                    about this certificate&apos;s authenticity, please contact DLEC immediately.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Search Another Certificate
                  </button>
                  <a
                    href="/contact"
                    className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center"
                  >
                    Contact DLEC
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* How It Works — shown only before first search */}
      {!searched && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              How Certificate Validation Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 text-center shadow-md">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-blue-700" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enter Certificate Number</h3>
                <p className="text-gray-600">Enter your DLEC certificate number in the format DLEC/CAL/XXXXX</p>
              </div>
              <div className="bg-white rounded-xl p-8 text-center shadow-md">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-purple-700" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Verification</h3>
                <p className="text-gray-600">Our system instantly verifies the certificate against the DLEC secure database</p>
              </div>
              <div className="bg-white rounded-xl p-8 text-center shadow-md">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-green-700" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">View Full Details</h3>
                <p className="text-gray-600">Access complete calibration data and traceability information</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CertificateValidationPage;
