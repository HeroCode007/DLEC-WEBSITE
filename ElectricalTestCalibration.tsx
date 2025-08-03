import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Award, ArrowRight, Phone, Shield } from 'lucide-react';

const ElectricalTestCalibration = () => {
  const equipment = [
    "Digital multimeters",
    "Clamp meters",
    "Insulation testers",
    "Ground resistance testers",
    "Power quality analyzers",
    "Oscilloscopes",
    "Function generators",
    "Power supplies"
  ];

  const applications = [
    {
      title: "Manufacturing Quality Control",
      description: "Electrical testing and calibration for production line equipment and quality assurance processes."
    },
    {
      title: "Maintenance & Repair",
      description: "Calibration of test equipment used for electrical maintenance and troubleshooting activities."
    },
    {
      title: "Safety Compliance",
      description: "Ensuring electrical test equipment meets safety standards and regulatory requirements."
    },
    {
      title: "Research & Development",
      description: "Precision calibration for laboratory and R&D electrical measurement applications."
    },
    {
      title: "Field Service",
      description: "Calibration of portable electrical test equipment used in field service applications."
    },
    {
      title: "Power Systems",
      description: "Calibration of equipment used for power system analysis and electrical grid monitoring."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-indigo-600" size={48} />
                <span className="text-6xl">⚡</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Electrical Test Equipment <span className="text-indigo-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional calibration for multimeters, clamp meters, and electrical testers to ensure compliance with manufacturer standards and industry requirements. Precision electrical calibration for safety and accuracy.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://i.postimg.cc/4xr4SDsW-/electric.png" 
                alt="Electrical test equipment calibration" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Electrical Test Equipment We Calibrate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration services for all types of electrical test and measurement instruments used in industrial, commercial, and laboratory applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <div key={index} className="bg-indigo-50 rounded-xl p-6 text-center">
                <Zap className="text-indigo-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{item}</h3>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Electrical Calibration</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our electrical test equipment calibration services ensure your instruments provide accurate, reliable measurements critical for safety, quality control, and regulatory compliance.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="text-indigo-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Safety Compliance</h3>
                    <p className="text-gray-600">Ensure electrical test equipment meets safety standards and manufacturer specifications.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Award className="text-indigo-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Industry Standards</h3>
                    <p className="text-gray-600">Compliance with IEEE, IEC, and ANSI standards for electrical measurement equipment.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-indigo-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">National Standard Traceability</h3>
                    <p className="text-gray-600">All calibrations traceable to National electrical standards for maximum accuracy.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Service Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" size={20} />
                  <span className="text-gray-700">On-site and laboratory calibration options</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" size={20} />
                  <span className="text-gray-700">Fast turnaround times</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" size={20} />
                  <span className="text-gray-700">Comprehensive calibration certificates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" size={20} />
                  <span className="text-gray-700">Equipment condition assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" size={20} />
                  <span className="text-gray-700">Calibration reminder services</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" size={20} />
                  <span className="text-gray-700">Technical support and consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our electrical test equipment calibration services support critical applications across industries requiring precise electrical measurements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{app.title}</h3>
                <p className="text-gray-700 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our electrical calibration services comply with all major national and international standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 rounded-xl p-8 text-center">
              <Award className="text-indigo-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IEEE Standards</h3>
              <p className="text-gray-600">Compliance with IEEE electrical measurement and calibration standards.</p>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-8 text-center">
              <Shield className="text-indigo-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IEC Standards</h3>
              <p className="text-gray-600">International Electrotechnical Commission standards for electrical equipment.</p>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-8 text-center">
              <CheckCircle className="text-indigo-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">National Standard Traceability</h3>
              <p className="text-gray-600">All calibrations traceable to National Standard electrical measurement standards.</p>
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
              A systematic approach ensuring accurate, reliable, and compliant electrical calibration results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {["Inspection", "Calibration", "Verification", "Documentation"].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{i + 1}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step}</h3>
                <p className="text-gray-600">
                  {[
                    "Inspect equipment condition and verify operational status",
                    "Perform calibration using certified electrical standards",
                    "Verify calibration accuracy across all parameters",
                    "Issue detailed calibration certificate and report"
                  ][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ensure Electrical Safety with Professional Calibration</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Trust DLEC for precise electrical test equipment calibration services that ensure safety, accuracy, and regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="border border-black-600 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Get Quote <ArrowRight size={20} />
            </Link>
            <a 
              href="tel:0321-4182021"
              className="border border-black-600 text-black-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Phone size={20} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElectricalTestCalibration;
