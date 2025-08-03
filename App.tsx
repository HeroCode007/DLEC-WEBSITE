import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/scroll';
import Intro from './components/Intro'; // ✅ Import the Intro

// Page imports...
import HomePage from './pages/HomePage';
import TemperatureCalibration from './pages/services/TemperatureCalibration';
import LineLengthCalibration from './pages/services/LineLengthCalibration';
import WeighingScalesCalibration from './pages/services/WeighingScalesCalibration';
import SoundLevelCalibration from './pages/services/SoundLevelCalibration';
import LightLuxCalibration from './pages/services/LightLuxCalibration';
import FlowEquipmentCalibration from './pages/services/FlowEquipmentCalibration';
import ElectricalTestCalibration from './pages/services/ElectricalTestCalibration';
import ForceCalibration from './pages/services/ForceCalibration';
import ConstructionCalibration from './pages/services/ConstructionCalibration';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import LineLengthCalibrationPage from './pages/services/LineLengthCalibrationPage';



// Inside your <Routes>:

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
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
      )}
    </Router>
  );
}

export default App;
