import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, CheckCircle, Clock, Award, ArrowRight, Phone, Eye } from 'lucide-react';

const LightLuxCalibration = () => {
  const equipment = [
    "Lux meters",
    "Light meters",
    "Illuminance meters",
    "Photometers",
    "UV meters",
    "LED light meters",
    "Color temperature meters",
    "Luminance meters"
  ];

  const applications = [
    {
      title: "Workplace Lighting",
      description: "OSHA compliance for workplace illumination standards ensuring adequate lighting for worker safety and productivity."
    },
    {
      title: "Photography & Film",
      description: "Precise light measurement for professional photography, cinematography, and studio lighting applications."
    },
    {
      title: "Horticulture",
      description: "Light intensity measurements for greenhouse operations and controlled environment agriculture."
    },
    {
      title: "Museum & Gallery",
      description: "Conservation lighting measurements to protect artwork and artifacts from light damage."
    },
    {
      title: "Healthcare Facilities",
      description: "Medical facility lighting compliance for surgical suites, patient rooms, and diagnostic areas."
    },
    {
      title: "Manufacturing Quality",
      description: "Industrial lighting verification for quality control and inspection processes."
    }
  ];

  const standards = [
    "OSHA 29 CFR 1926.56",
    "IES Lighting Standards",
    "ISO 8995 Workplace Lighting",
    "CIE Photometric Standards",
    "ANSI/IESNA Standards",
    "EN 12464 Lighting Standards"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="text-yellow-600" size={48} />
                <span className="text-6xl">💡</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Light/Lux Meter <span className="text-yellow-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional calibration for photometric light meters and illuminance measurement devices. Ensuring precise luminance measurements for OSHA compliance, workplace safety, and quality control applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link 
                  to="/contact"
                  className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a 
                  href="tel:0321-4182021"
                  className="border border-yellow-600 text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a> */}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i.postimg.cc/WbjKpXbX/20250719-1447-Lux-and-Light-Meters-simple-compose-01k0h18464frnaszhc3mft2h2d.png" 
                alt="Light meter calibration equipment" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Photometric Equipment We Calibrate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration services for all types of light measurement instruments used in workplace safety, quality control, and professional applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <div key={index} className="bg-yellow-50 rounded-xl p-6 text-center">
                <Lightbulb className="text-yellow-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}


      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our light/lux meter calibration services support critical applications across industries requiring precise illuminance measurements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-yellow-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{app.title}</h3>
                <p className="text-gray-700 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our light measurement calibration services comply with all major photometric standards and regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standards.map((standard, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <Award className="text-yellow-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{standard}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Professional Light Meter Calibration</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-yellow-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Worker Safety</h3>
              <p className="text-gray-600">Ensure adequate workplace lighting for employee safety, comfort, and productivity.</p>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Control</h3>
              <p className="text-gray-600">Maintain consistent lighting conditions for inspection and quality control processes.</p>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Energy Efficiency</h3>
              <p className="text-gray-600">Optimize lighting systems for energy efficiency while maintaining required illumination levels.</p>
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
              A systematic approach ensuring accurate, reliable, and compliant light measurement calibration results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Assessment</h3>
              <p className="text-gray-600">Inspect meter condition and verify spectral response</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calibration</h3>
              <p className="text-gray-600">Perform calibration using certified light sources</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification</h3>
              <p className="text-gray-600">Verify accuracy across illuminance range</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certification</h3>
              <p className="text-gray-600">Issue traceable calibration certificate</p>
            </div>
          </div>
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
  <Link
    to="/contact"
    className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center gap-2"
  >
    Get Quote <ArrowRight size={20} />
  </Link>

  <a
    href="tel:0321-4182021"
    className="border border-yellow-600 text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-50 transition-colors duration-200 flex items-center justify-center gap-2"
  >
    <Phone size={20} /> Call Now
  </a>
</div>

        </div>
      </section>

      
    </div>
  );
};

export default LightLuxCalibration;