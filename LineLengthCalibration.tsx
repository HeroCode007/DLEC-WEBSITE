import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, CheckCircle, Clock, Award, ArrowRight, Phone } from 'lucide-react';

const PressureCalibration = () => {
  const equipment = [
    "Pressure gauges",
    "Transducers",
    "Transmitters",
    "Manometers",
    "Barometers",
    "Pressure switches",
    "Deadweight testers",
    "Digital pressure indicators"
  ];

  const industries = [
    {
      name: "Oil & Gas",
      description: "Critical pressure measurement for pipelines, refineries, and drilling operations"
    },
    {
      name: "Manufacturing",
      description: "Ensuring precise pressure measurements in industrial equipment and processes"
    },
    {
      name: "Pharmaceutical",
      description: "Accurate pressure control for production of medications and sterile environments"
    },
    {
      name: "Food & Beverage",
      description: "Monitoring pressure in processing and packaging to ensure product safety and quality"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gauge className="text-blue-600" size={48} />
                <span className="text-6xl">⚙️</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pressure <span className="text-blue-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Reliable calibration services for all pressure measuring instruments. Ensure accurate pressure readings across critical applications in various industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link 
                  to="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a 
                  href="tel:0321-4182021"
                  className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a> */}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i.postimg.cc/Wzzf6967/085c76ac-74d2-4fee-ae2d-8a69d9b3b963.png" 
                alt="Pressure measurement calibration" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pressure Measuring Equipment We Calibrate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration services for all types of pressure measurement devices ensuring optimal performance and accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-6 text-center">
                <CheckCircle className="text-blue-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Accurate Pressure Calibration</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our pressure calibration services guarantee accurate readings vital for safety, compliance, and operational efficiency.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Award className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ISO Certified Calibration</h3>
                    <p className="text-gray-600">Calibrations performed to ISO 17025 standards ensuring global compliance and accuracy.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quick Turnaround</h3>
                    <p className="text-gray-600">Fast and efficient calibration processes to reduce downtime and maintain productivity.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Detailed Reports</h3>
                    <p className="text-gray-600">Comprehensive calibration certificates and documentation for audit and compliance purposes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Why DLEC for Pressure Calibration?</h3>
              <p className="text-lg mb-6">
                Experience unmatched precision, reliability, and industry-trusted expertise with DLEC's pressure calibration services.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} /> National Standard Traceability
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} /> Fast Turnaround Time
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} /> Certified & Compliant Processes
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} /> Dedicated Technical Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our pressure calibration services cater to a wide range of industries where precise pressure measurement is critical.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-700 leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Professional Pressure Calibration</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Assurance</h3>
              <p className="text-gray-600">Prevent accidents and equipment failures by ensuring accurate pressure readings.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance</h3>
              <p className="text-gray-600">Stay compliant with industry standards and regulations through traceable calibration.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Operational Efficiency</h3>
              <p className="text-gray-600">Reduce process variability and enhance productivity with accurately calibrated devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ensure Pressure Measurement Accuracy with Professional Calibration</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Trust DLEC for expert pressure calibration services that guarantee accuracy, compliance, and operational safety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link 
  to="/contact"
  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
>
  Get Quote <ArrowRight size={20} />
</Link>

<a 
  href="tel:0321-4182021"
  className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
>
  <Phone size={20} /> Call Now
</a>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PressureCalibration;
