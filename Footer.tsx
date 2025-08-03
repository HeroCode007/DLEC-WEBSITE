import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import logo from './dleclogo.png'; // Ensure logo is in the correct path

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-6">
          {/* Left: Logo and Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full md:w-auto text-center sm:text-left">
            <img
              src={logo}
              alt="Direct Line Engineering Corporation Logo"
              className="h-24 w-auto object-contain border-2 border-white rounded-3xl shadow-md bg-white p-1"
            />
            <h3 className="text-lg sm:text-xl font-bold leading-tight max-w-xs">
              Direct Line Engineering Corporation
            </h3>
          </div>

          {/* Right: Footer Content */}
          <div className="w-full md:flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-2 text-base">Quick Links</h4>
              <div className="space-y-1 text-sm">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  About
                </Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-semibold mb-2 text-base">Certifications</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <div>ISO 9001:2015 Certified</div>
                <div>ASTM Member</div>
                <div>Traceable Standards</div>
              </div>
            </div>

            {/* Contact / Social */}
            <div>
              <h4 className="font-semibold mb-2 text-base">Connect With Us</h4>
              <p className="text-gray-400 mb-2 leading-relaxed text-sm">
                Professional calibration services ensuring precision, productivity, and profitability.
              </p>
              <div className="flex gap-3 justify-center sm:justify-start">
                <a
                  href="https://www.facebook.com/calibrations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Visit our Facebook page"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="https://wa.me/923214182021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Contact us on WhatsApp"
                >
                  <FaWhatsapp size={14} />
                </a>
                <a
                  href="mailto:mail.dlec@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Email us"
                >
                  <FaEnvelope size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-4 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Direct Line Engineering Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
