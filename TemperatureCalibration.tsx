import React from 'react';
import { Link } from 'react-router-dom';
import { Thermometer, CheckCircle, Clock, Award, ArrowRight, Phone } from 'lucide-react';

const TemperatureCalibration = () => {
  const applications = [
    "Medical freezers and refrigeration units",
    "Autoclaves and sterilization equipment",
    "Data loggers and temperature monitoring systems",
    "Thermocouples and RTDs",
    "Environmental chambers",
    "Ovens and furnaces",
    "HVAC systems",
    "Food processing equipment"
  ];

  const standards = [
    "National Pakistan traceable standards",
    "ISO Compliance",
    "FDA validation requirements",
    "Pharmaceutical industry guidelines",
    "Food safety regulations"
  ];

  const benefits = [
    {
      title: "Pharmaceutical Compliance",
      description: "Ensure Pharmaceutical equipment meets strict temperature requirements for safety and regulatory compliance."
    },
    {
      title: "Manufacturing Quality",
      description: "Maintain precise temperature control in manufacturing processes to ensure product quality and consistency."
    },
    {
      title: "Cost Reduction",
      description: "Prevent costly product losses and equipment failures through accurate temperature monitoring and control."
    },
    {
      title: "Regulatory Compliance",
      description: "Meet all other regulatory requirements for temperature-sensitive applications."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="text-gray-600" size={48} />
                <span className="text-6xl">🌡️</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Temperature <span className="text-gray-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Precision temperature calibration for pharmaceutical, manufacturing, and research applications. Ensure accuracy for thermocouples, medical freezers, autoclaves, data loggers, and temperature monitoring devices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link 
                  to="/contact"
                  className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a 
                  href="tel:0321-4182021"
                  className="border border-gray-600 text-gray-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a> */}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i.postimg.cc/zfkfN08Z/Leonardo-Phoenix-10-A-highly-detailed-and-realistic-illustrati-0.jpg" 
                alt="Temperature calibration equipment" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Temperature Calibration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              DLEC provides precise temperature calibration services for critical applications in healthcare, manufacturing, and research environments.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Equipment We Calibrate</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {applications.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-gray-600 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Service Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="text-gray-600" size={24} />
                  <span className="font-medium text-gray-900">National Standard Traceable Calibration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-600" size={24} />
                  <span className="font-medium text-gray-900">On-Site & Laboratory Services</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-gray-600" size={24} />
                  <span className="font-medium text-gray-900">ISO Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="text-gray-600" size={24} />
                  <span className="font-medium text-gray-900">Wide & Diverse Range</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards & Compliance
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our temperature calibration services meet the most stringent industry standards and regulatory requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standards.map((standard, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-gray-600" size={24} />
                  <h3 className="font-semibold text-gray-900">{standard}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Professional Temperature Calibration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ensure accuracy, compliance, and cost-effectiveness with DLEC's temperature calibration services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Calibration Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach ensuring accurate, reliable, and traceable temperature calibration results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {['Assessment', 'Calibration', 'Documentation', 'Follow-up'].map((step, idx) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{idx + 1}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step}</h3>
                <p className="text-gray-600">
                  {[
                    "Evaluate equipment condition and calibration requirements",
                    "Perform precise calibration using traceable standards",
                    "Provide detailed calibration certificates and reports",
                    "Schedule next calibration and provide ongoing support"
                  ][idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Schedule Your Temperature Calibration?</h2>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Ensure your temperature-critical equipment meets the highest standards of accuracy and compliance. Contact DLEC today for professional temperature calibration services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-gray-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              Request Quote <ArrowRight size={20} />
            </Link>
            <a 
              href="tel:0321-4182021"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-600 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemperatureCalibration;
