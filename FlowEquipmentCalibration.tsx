import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, CheckCircle, Clock, Award, ArrowRight, Phone, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const FlowEquipmentCalibration = () => {
  const equipment = [
    "Flow meters (liquid & gas)",
    "Water flow sensors",
    "Mass flow controllers",
    "Turbine flow meters",
    "Electromagnetic flow meters",
    "Ultrasonic flow meters",
    "Positive displacement meters",
    "Differential pressure flow meters"
  ];

  const applications = [
    {
      title: "Water Treatment",
      description: "Flow measurement calibration for water treatment plants, distribution systems, and quality monitoring."
    },
    {
      title: "Chemical Processing",
      description: "Precise flow control for chemical manufacturing, batch processing, and safety systems."
    },
    {
      title: "Oil & Gas",
      description: "Flow measurement for pipeline monitoring, custody transfer, and process control applications."
    },
    {
      title: "HVAC Systems",
      description: "Air and water flow calibration for building automation and energy management systems."
    },
    {
      title: "Food & Beverage",
      description: "Sanitary flow measurement for food processing, beverage production, and CIP systems."
    },
    {
      title: "Pharmaceutical",
      description: "Critical flow measurements for drug manufacturing and clean room applications."
    }
  ];

  const serviceTypes = [
    {
      title: "On-Site Calibration",
      description: "Convenient on-site calibration services to minimize downtime and maintain system integrity.",
      benefits: ["No equipment removal", "Minimal downtime", "System integrity maintained", "Real-world conditions"]
    },
    {
      title: "Laboratory Calibration",
      description: "Precision laboratory calibration using state-of-the-art flow standards and controlled conditions.",
      benefits: ["Maximum accuracy", "Controlled environment", "Comprehensive testing", "Detailed analysis"]
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-blue-50 to-white py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Waves className="text-blue-600" size={48} />
                <span className="text-6xl">🌊</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Flow Equipment <span className="text-blue-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional calibration for flow meters and sensors measuring water and fluid flow. Available on-site or in our state-of-the-art laboratory facility for maximum precision and convenience.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://i.postimg.cc/fTrxqRFm/flowmeter-calibration-service.jpg"
                alt="Flow meter calibration equipment"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Equipment Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flow Equipment We Calibrate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration services for all types of flow measurement devices used in industrial, commercial, and research applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Droplets className="text-blue-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose between convenient on-site calibration or precision laboratory services based on your specific requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {serviceTypes.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <h4 className="font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                <div className="space-y-3">
                  {service.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calibration Specs Panel with Animation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Left */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Capabilities</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our flow calibration services cover a wide range of flow rates and fluid types, ensuring accurate measurements for your specific applications.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Waves className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Wide Flow Range</h3>
                    <p className="text-gray-600">Calibration capabilities from micro-flows to high-volume industrial applications.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Award className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">National Standard Traceable</h3>
                    <p className="text-gray-600">All calibrations traceable to national flow standards for maximum accuracy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Multiple Fluids</h3>
                    <p className="text-gray-600">Calibration for water, oils, chemicals, and gas flow applications.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Right Panel */}
<div className="bg-blue-50 rounded-xl p-3">
  <div className="space-y-2">
    <div className="pt-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Service Highlights</h4>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Traceable Calibration</li>
        <li>On-Site & Laboratory Services</li>
        <li>ISO Compliance</li>
        <li>Wide & Diverse Range</li>
      </ul>
    </div>
  </div>
  
</div>

          </div>
        </div>
      </section>
              <section className="bg-blue-50 py-16">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Calibrate?</h2>
    <p className="text-xl text-gray-600 mb-8">
      Contact us today to schedule your flow equipment calibration and ensure precise, reliable measurements.
    </p>
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <Link
        to="/contact"
        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
      >
        Get Quote <ArrowRight size={20} />
      </Link>
      <a
        href="tel:0321-4182021"
        className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2"
      >
        <Phone size={20} /> Call Now
      </a>
    </div>
  </div>
</section>

    </div>
  );
};

export default FlowEquipmentCalibration;
