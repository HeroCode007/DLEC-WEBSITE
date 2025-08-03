import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Ruler,
  Gauge
} from 'lucide-react';

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const services = [
    {
      title: "Temperature Calibration",
      description: "Precision calibration for thermocouples, medical freezers, autoclaves, data loggers, and temperature monitoring devices.",
      icon: "🌡️",
      path: "/services/temperature-calibration"
    },
  {
  title: "Line Length & Dimensions Calibration",
  description: "Precision calibration of rulers, calipers, micrometers, and length measuring instruments for dimensional accuracy.",
  iconComponent: <Ruler size={36} className="text-blue-700" />,
  path: "/services/line-length-dimensions-calibration"
  },

    {
      title: "Pressure Calibration",
      description: "Precise calibration of pressure gauges, manometers, and transducers for safe and accurate measurements.",
      iconComponent: <Gauge size={36} className="text-blue-700" />,
      path: "/services/line-length-calibration"
    },
    {
      title: "Weighing & Scales Calibration",
      description: "Laboratory balances, scales, and weights calibration with traceable certificates.",
      icon: "⚖️",
      path: "/services/weighing-scales-calibration"
    },
    {
      title: "Sound Level Calibration",
      description: "Sound meters and noise meters calibration to meet OSHA standards for workplace safety.",
      icon: "🔊",
      path: "/services/sound-level-calibration"
    },
    {
      title: "Light/Lux Meter Calibration",
      description: "Photometric light meters calibration for precise luminance measurements and OSHA compliance.",
      icon: "💡",
      path: "/services/light-lux-calibration"
    },
    {
      title: "Flow Equipment Calibration",
      description: "Flow meters and sensors calibration for water and fluid measurements, on-site or in-lab.",
      icon: "🌊",
      path: "/services/flow-equipment-calibration"
    },
    {
      title: "Electrical Test Equipment Calibration",
      description: "Multimeters, clamp meters, and electrical testers calibration for industry compliance.",
      icon: "⚡",
      path: "/services/electrical-test-calibration"
    },
    {
      title: "Force Calibration",
      description: "Load cells and force measurement devices calibration (5N to 2000kN) for testing applications.",
      icon: "🔧",
      path: "/services/force-calibration"
    },
    {
title: "Glassware Calibration Services",
description: "Accurate calibration, maintenance, and documentation for laboratory glassware and volumetric instruments.",
icon: "⚗️",
path: "/services/construction-calibration"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
            <div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Precision Calibration for <span className="text-black">Productivity & Profitability</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At DLEC, we've been a trusted partner in the industry for over two decades, providing proactive calibration services that ensure accuracy, reliability, and efficiency. Our team of experts is dedicated to delivering high-quality solutions that meet the evolving needs of our clients across various sectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact"
                  className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  GET A QUOTE <ChevronRight size={20} />
                </Link>
                <a 
                  href="#services"
                  className="border border-blue-700 text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                >
                  View Services
                </a>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <img 
                src="https://i.postimg.cc/Ls2KBnMN/main.jpg" 
                alt="Engineer calibrating equipment in a professional lab" 
                className="w-full h-[22rem] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Calibration Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration solutions with both on-site and in-lab services, ensuring efficiency and traceability to national standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={service.path}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-4xl mb-4">
                  {service.iconComponent || service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center text-blue-700 font-medium group-hover:gap-2 transition-all duration-200">
                  Learn More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-blue-700 rounded-2xl p-8 text-center text-white" data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-4">On-Site & Laboratory Services Available</h3>
            <p className="text-lg mb-6 opacity-90">
              Choose the convenience of on-site calibration or utilize our state-of-the-art laboratory facility for maximum precision and efficiency.
            </p>
            <Link 
              to="/contact"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Schedule Service
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
{/* What Sets DLEC Apart Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Sets DLEC Apart?</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
        Discover the DLEC difference – where quality, precision, and client focus come together to deliver unmatched calibration services.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          title: "Proven Expertise",

          description: "With over two decades of experience, DLEC delivers calibration solutions that are both nationally and internationally traceable."
        },
        {
          title: "Comprehensive Services",

          description: "We calibrate electrical, temperature, pressure, force, weighing, sound, and light/lux devices—on-site or in-lab."
        },
        {
          title: "Flexible Solutions",

          description: "Choose between centralized lab or on-site calibration to minimize downtime and boost operational efficiency."
        },
        {
          title: "Quality & Integrity",
          description: "Every calibration, inspection, and load test is backed by a commitment to compliance and precision."
        },
        {
          title: "Comprehensive Documentation",
   
          description: "From initial calibration to detailed reports, we help you stay audit-ready and compliant with quality standards."
        },
        {
          title: "Customized Plans",

          description: "Whether you're a startup or enterprise, we tailor calibration plans to meet your unique operational needs."
        },
        {
          title: "Competitive Pricing",

          description: "Enjoy world-class calibration services that respect your budget without compromising on quality."
        }
      ].map((item, index) => (
        <div 
          key={index} 
          className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition duration-300" 
          data-aos="fade-up" 
          data-aos-delay={index * 100}
        >

          <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;
