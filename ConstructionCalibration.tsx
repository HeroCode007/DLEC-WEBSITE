import React from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  Phone,
  Settings,
  Wrench
} from 'lucide-react';

const GlasswareCalibration = () => {
  const equipment = [
    "Volumetric flasks",
    "Measuring cylinders",
    "Burettes",
    "Pipettes",
    "Beakers",
    "Graduated flasks",
    "Test tubes",
    "Dispensers"
  ];

  const services = [
    {
      title: "Calibration Services",
      description: "Precision calibration of laboratory glassware to ensure volumetric accuracy in scientific and industrial applications.",
      icon: <Settings className="text-indigo-600" size={32} />
    },
    {
      title: "Repair & Refurbishment",
      description: "Minor repairs and maintenance to extend the usability of precision glassware.",
      icon: <Wrench className="text-indigo-600" size={32} />
    },
    {
      title: "Preventive Maintenance",
      description: "Scheduled maintenance and re-calibration to keep lab glassware accurate and compliant.",
      icon: <Clock className="text-indigo-600" size={32} />
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FlaskConical className="text-indigo-600" size={48} />
                <span className="text-6xl">⚗️</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 break-words">
                Glassware <span className="text-indigo-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Accredited calibration, maintenance, and documentation for volumetric glassware used in laboratories across pharmaceutical, chemical, and industrial sectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a
                  href="tel:0321-4182021"
                  className="border border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://i.postimg.cc/XYT94NwF/Banner-2-1-scaled.jpg"
                alt="Glassware calibration in laboratory"
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Glassware We Calibrate</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-700">
            {equipment.map((item, index) => (
              <div
                key={index}
                className="bg-indigo-50 rounded-lg py-4 px-2 font-medium shadow-sm hover:shadow-md transition duration-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlasswareCalibration;
