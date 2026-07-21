import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './scroll';
import Intro from './Intro'; // ✅ Import the Intro
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Page imports...
import HomePage from './HomePage';
import TemperatureCalibration from './TemperatureCalibration';
import LineLengthCalibration from './LineLengthCalibration';
import WeighingScalesCalibration from './WeighingScalesCalibration';
import SoundLevelCalibration from './SoundLevelCalibration';
import LightLuxCalibration from './LightLuxCalibration';
import FlowEquipmentCalibration from './FlowEquipmentCalibration';
import ElectricalTestCalibration from './ElectricalTestCalibration';
import ForceCalibration from './ForceCalibration';
import ConstructionCalibration from './ConstructionCalibration';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

import LineLengthCalibrationPage from './LineLengthCalibrationPage';
import CertificateVerifyPage from './CertificateVerifyPage';
import AdminCertificatesDashboard from './AdminCertificatesDashboard';
import AdminLoginPage from './AdminLoginPage';



// Inside your <Routes>:

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro has already been shown in this session
    const introShown = sessionStorage.getItem('dlec_intro_shown');
    return !introShown; // Show intro only if not shown yet
  });

  const handleIntroFinish = () => {
    // Mark intro as shown for this session
    sessionStorage.setItem('dlec_intro_shown', 'true');
    setShowIntro(false);
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        {showIntro ? (
          <Intro onFinish={() => handleIntroFinish()} />
        ) : (
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Certificate verify landing page — no Header/Footer, public */}
              <Route path="/certificate" element={<CertificateVerifyPage />} />

              {/* Admin login — no Header/Footer */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin dashboard — protected, no Header/Footer */}
              <Route
                path="/admin/certificates"
                element={
                  <ProtectedRoute>
                    <AdminCertificatesDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Public routes — with Header/Footer */}
              <Route
                path="*"
                element={
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/services/temperature-calibration" element={<TemperatureCalibration />} />
                      <Route path="/services/line-length-calibration" element={<LineLengthCalibration />} />
                      <Route path="/services/weighing-scales-calibration" element={<WeighingScalesCalibration />} />
                      <Route path="/services/sound-level-calibration" element={<SoundLevelCalibration />} />
                      <Route path="/services/light-lux-calibration" element={<LightLuxCalibration />} />
                      <Route path="/services/flow-equipment-calibration" element={<FlowEquipmentCalibration />} />
                      <Route path="/services/electrical-test-calibration" element={<ElectricalTestCalibration />} />
                      <Route path="/services/force-calibration" element={<ForceCalibration />} />
                      <Route path="/services/construction-calibration" element={<ConstructionCalibration />} />
                      <Route path="/services/line-length-dimensions-calibration" element={<LineLengthCalibrationPage />} />

                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
