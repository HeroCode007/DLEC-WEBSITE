import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle, Clock, Award, ArrowRight, Phone, Target } from 'lucide-react';

const ForceCalibration = () => {
  const equipment = [
    "Load cells",
    "Force transducers",
    "Torque sensors",
    "Tension meters",
    "Compression testers",
    "Universal testing machines",
    "Dynamometers",
    "Force gauges"
  ];

  const forceRanges = [
    {
      range: "5N to 100N",
      applications: "Small component testing, electronics, precision instruments"
    },
    {
      range: "100N to 10kN",
      applications: "Material testing, quality control, laboratory applications"
    },
    {
      range: "10kN to 100kN",
      applications: "Structural testing, automotive components, industrial applications"
    },
    {
      range: "100kN to 2000kN",
      applications: "Heavy structural testing, construction materials, large-scale testing"
    }
  ];

  const applications = [
    {
      title: "Material Testing",
      description: "Tensile and compression testing for material characterization and quality control in manufacturing."
    },
    {
      title: "Structural Engineering",
      description: "Load testing for structural components, bridges, and building materials to ensure safety and compliance."
    },
    {
      title: "Automotive Testing",
      description: "Force measurement for crash testing, component durability, and safety system validation."
    },
    {
      title: "Aerospace Applications",
      description: "Precision force calibration for aircraft components, landing gear, and structural testing."
    },
    {
      title: "Manufacturing QC",
      description: "Production line force monitoring and quality control for manufactured components."
    },
    {
      title: "Research & Development",
      description: "Laboratory force measurement for research applications and product development."
    }
  ];


  

  const testTypes = [
    "Tensile testing",
    "Compression testing",
    "Fatigue testing",
    "Creep testing",
    "Impact testing",
    "Torque testing"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Wrench className="text-gray-700" size={48} />
                <span className="text-6xl">🔧</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Force <span className="text-gray-700">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional calibration for load cells and force measurement devices from 5N to 2000kN. Precision force calibration for tensile and compression testing applications in materials, structural, and manufacturing industries.
              </p>

            </div>
            <div className="relative">
              <img 
                src="https://i.postimg.cc/FFbn78Rw/20250715-1545-Calibration-with-Load-Cell-simple-compose-01k06txf6kf0998varygsq0sfm.png" 
                alt="Force calibration testing equipment" 
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Force Measurement Equipment We Calibrate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration services for all types of force measurement devices used in testing, manufacturing, and research applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <Target className="text-gray-700 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Force Ranges */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Force Calibration Ranges</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our force calibration capabilities span from precision micro-force measurements to heavy-duty industrial applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {forceRanges.map((range, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{range.range}</h3>
                <p className="text-gray-700 leading-relaxed">{range.applications}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Force Calibration</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our force calibration services ensure your load cells and force measurement devices provide accurate, reliable measurements critical for material testing, structural analysis, and quality control.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Award className="text-gray-700 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">National Traceable Standards</h3>
                    <p className="text-gray-600">All force calibrations traceable to national force standards for maximum accuracy and compliance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Target className="text-gray-700 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Wide Force Range</h3>
                    <p className="text-gray-600">Calibration capabilities from 5N to 2000kN covering all industrial and research applications.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-gray-700 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Multiple Test Types</h3>
                    <p className="text-gray-600">Support for tensile, compression, and specialized force measurement applications.</p>
                  </div>
                </div>
              </div>
            </div>
            
<div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose DLEC?</h3>
  <div className="grid sm:grid-cols-2 gap-6">
    <div className="flex items-start space-x-4">
      <div className="text-blue-500 text-xl mt-1">🧪</div>
      <div>
        <p className="font-medium text-gray-900">Accredited Precision</p>
        <p className="text-gray-600">ISO 9001:2015 certified calibration services for trusted results.</p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <div className="text-green-500 text-xl mt-1">🛠️</div>
      <div>
        <p className="font-medium text-gray-900">Comprehensive Services</p>
        <p className="text-gray-600">From electrical to pressure, we calibrate a broad range of instruments.</p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <div className="text-purple-500 text-xl mt-1">📍</div>
      <div>
        <p className="font-medium text-gray-900">Nationwide Coverage</p>
        <p className="text-gray-600">On-site and in-lab services available across Pakistan.</p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <div className="text-yellow-500 text-xl mt-1">👨‍🔧</div>
      <div>
        <p className="font-medium text-gray-900">Skilled Technicians</p>
        <p className="text-gray-600">Experienced engineers ensure accurate, repeatable measurements.</p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <div className="text-pink-500 text-xl mt-1">📈</div>
      <div>
        <p className="font-medium text-gray-900">Traceability Guaranteed</p>
        <p className="text-gray-600">All calibrations are traceable to national/international standards.</p>
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Test Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Test Types</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our force calibration services support various testing methodologies and applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testTypes.map((test, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Wrench className="text-gray-700 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{test}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our force calibration services support critical applications across industries requiring precise force measurements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{app.title}</h3>
                <p className="text-gray-700 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Professional Force Calibration</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-gray-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Measurement Accuracy</h3>
              <p className="text-gray-600">Ensure precise force measurements for reliable test results and quality control.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-gray-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Standards Compliance</h3>
              <p className="text-gray-600">Meet ASTM, ISO, and other international standards for force measurement.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-gray-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">Maintain product quality and safety through accurate force testing and validation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Calibration Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach ensuring accurate, reliable, and traceable force calibration results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Equipment Assessment</h3>
              <p className="text-gray-600">Evaluate force measurement system and determine calibration requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Force Application</h3>
              <p className="text-gray-600">Apply known forces using certified reference standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Analysis</h3>
              <p className="text-gray-600">Analyze calibration data and determine measurement uncertainty</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certification</h3>
              <p className="text-gray-600">Issue detailed calibration certificate with traceability documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ensure Accurate Force Measurements with Professional Calibration</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Trust DLEC for precise force calibration services that ensure reliable testing results and compliance with industry standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          </div>
        </div>
        
      </section>
      {/* CTA Section */}
<section className="py-20 bg-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/contact"
        className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 justify-center"
      >
        Get Quote <ArrowRight size={20} />
      </Link>
      <a
        href="tel:0321-4182021"
        className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2 justify-center"
      >
        <Phone size={20} /> Call Now
      </a>
    </div>
  </div>
</section>

    </div>
  );
};

export default ForceCalibration;