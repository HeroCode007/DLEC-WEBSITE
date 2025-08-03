import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2, CheckCircle, Clock, Award, ArrowRight, Phone, Shield } from 'lucide-react';

const SoundLevelCalibration = () => {
  const equipment = [
    "Sound level meters",
    "Noise dosimeters",
    "Acoustic calibrators",
    "Octave band analyzers",
    "Personal noise monitors",
    "Environmental noise monitors",
    "Audiometers",
    "Vibration meters"
  ];

  const standards = [
  "ISO Quality System",
  "Safety Standards",
  "Class 1 & 2 Compliance",
  "Traceability to NPSL (Pakistan)",
  "PSQCA Guidelines",
  "Pak-EPA Environmental Noise Regulations"
];


  const applications = [
    {
      title: "Workplace Safety",
      description: "NSC compliance for occupational noise exposure monitoring and hearing conservation programs."
    },
    {
      title: "Environmental Monitoring",
      description: "Community noise assessments and environmental impact studies for construction and industrial projects."
    },
    {
      title: "Industrial Hygiene",
      description: "Noise exposure assessments in manufacturing, construction, and industrial environments."
    },
    {
      title: "Quality Control",
      description: "Product noise testing and acoustic quality control in manufacturing processes."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="text-orange-600" size={48} />
                <span className="text-6xl">🔊</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Sound Level <span className="text-orange-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional calibration for sound meters and noise meters to meet standards. Ensuring accurate noise measurements for workplace safety compliance and environmental monitoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link 
                  to="/contact"
                  className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a 
                  href="tel:0321-4182021"
                  className="border border-orange-600 text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a> */}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i.postimg.cc/PxsTrY7h/1-Acoustic-Calibration.jpg" 
                alt="Sound level meter calibration" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Acoustic Equipment We Calibrate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration services for all types of sound measurement instruments used in workplace safety and environmental monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <div key={index} className="bg-orange-50 rounded-xl p-6 text-center">
                <Volume2 className="text-orange-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NSC Compliance
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">NSC Compliance & Workplace Safety</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our sound level calibration services ensure your acoustic instruments meet NSC requirements for occupational noise exposure monitoring and hearing conservation programs.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="text-orange-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">NSC 29 CFR 1910.95 Compliance</h3>
                    <p className="text-gray-600">Calibration services meeting NSC occupational noise exposure standards and requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Award className="text-orange-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ANSI & IEC Standards</h3>
                    <p className="text-gray-600">Compliance with ANSI S1.4 and IEC 61672 standards for sound level meter accuracy.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-orange-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Traceable Calibration</h3>
                    <p className="text-gray-600">NIST traceable calibration certificates for regulatory compliance and audit requirements.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Calibration Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Frequency Range</span>
                  <span className="text-gray-600">20 Hz to 20 kHz</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Sound Level Range</span>
                  <span className="text-gray-600">30 dB to 140 dB</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Accuracy</span>
                  <span className="text-gray-600">±0.2 dB (Class 1)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Reference Standard</span>
                  <span className="text-gray-600">Class 1 Calibrator</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-900">Traceability</span>
                  <span className="text-gray-600">NIST/SI Units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Standards & Regulations */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards & Regulations</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Our sound level calibration services comply with national requirements such as Pak-EPA guidelines and are aligned with international standards including ISO.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {standards.map((standard, index) => (
        <div key={index} className="bg-orange-50 rounded-xl p-6 text-center">
          <Award className="text-orange-600 mx-auto mb-3" size={32} />
          <h3 className="font-semibold text-gray-900">{standard}</h3>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Applications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our sound level calibration services support critical applications across industries requiring accurate noise measurements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{app.title}</h3>
                <p className="text-gray-700 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Professional Sound Level Calibration</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Worker Safety</h3>
              <p className="text-gray-600">Protect employees from hearing damage through accurate noise exposure monitoring.</p>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Regulatory Compliance</h3>
              <p className="text-gray-600">Meet EPA and other regulatory requirements with traceable calibration.</p>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal Protection</h3>
              <p className="text-gray-600">Documented calibration provides legal protection and audit trail compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Calibration Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach ensuring accurate, reliable, and compliant sound level calibration results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Check</h3>
              <p className="text-gray-600">Inspect instrument condition and verify operational status</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calibration</h3>
              <p className="text-gray-600">Perform calibration using certified acoustic calibrators</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification</h3>
              <p className="text-gray-600">Verify calibration accuracy across frequency range</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600">Issue-Compliant Calibration Certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ensure NSC Compliance with Professional Sound Level Calibration</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Protect your workers and meet regulatory requirements with DLEC's professional sound level calibration services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center gap-2"

                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a 
                  href="tel:0321-4182021"
                  className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center gap-2"

                >
                  <Phone size={20} /> Call Now
                </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoundLevelCalibration;