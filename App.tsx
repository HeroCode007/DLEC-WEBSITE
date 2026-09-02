import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './scroll';
import Intro from './Intro'; // ✅ Import the Intro

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

// Admin panel and certificate verification are lazy-loaded and gated behind
// VITE_PUBLIC_ONLY so the public-only Vercel build never registers their
// routes, never calls the backend, and never bundles their chunks at all —
// the `if` below must stay a literal-foldable check so Vite's esbuild
// transform can dead-code-eliminate these dynamic imports per module,
// before Rollup ever puts them in the chunk graph.
// The flag is set in Vercel's Project Settings > Environment Variables
// (Production + Preview) — vercel.json's `build.env` does NOT work for
// this project and was removed after silently failing to apply it.
// StackCP's build leaves the flag unset and keeps the full app.
const PUBLIC_ONLY = import.meta.env.VITE_PUBLIC_ONLY === 'true';

const noopLazy = () => lazy(() => Promise.resolve({ default: () => null }));

let AuthProvider: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
let ProtectedRoute: React.LazyExoticComponent<React.ComponentType<any>> = noopLazy();
let CertificateVerifyPage: React.LazyExoticComponent<React.ComponentType<any>> = noopLazy();
let AdminCertificatesDashboard: React.LazyExoticComponent<React.ComponentType<any>> = noopLazy();
let AdminLoginPage: React.LazyExoticComponent<React.ComponentType<any>> = noopLazy();

if (!PUBLIC_ONLY) {
  AuthProvider = lazy(() =>
    import('./AuthContext').then((m) => ({ default: m.AuthProvider }))
  );
  ProtectedRoute = lazy(() => import('./ProtectedRoute'));
  CertificateVerifyPage = lazy(() => import('./CertificateVerifyPage'));
  AdminCertificatesDashboard = lazy(() => import('./AdminCertificatesDashboard'));
  AdminLoginPage = lazy(() => import('./AdminLoginPage'));
}

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

  const publicSite = (
    <div className="min-h-screen bg-white">
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
    </div>
  );

  return (
    <Router>
      <ScrollToTop />
      {showIntro ? (
        <Intro onFinish={() => handleIntroFinish()} />
      ) : PUBLIC_ONLY ? (
        publicSite
      ) : (
        <Suspense fallback={null}>
          <AuthProvider>
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
              <Route path="*" element={publicSite} />
            </Routes>
          </AuthProvider>
        </Suspense>
      )}
    </Router>
  );
}

export default App;
