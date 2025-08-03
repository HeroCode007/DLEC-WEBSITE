import { Link } from 'react-router-dom';
import { Ruler } from 'lucide-react';
import { motion } from 'framer-motion';

const LineLengthCalibrationPage = () => {
  return (
    <div className="pt-16">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Ruler size={48} className="text-blue-700" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Line Length & Dimensional Calibration
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Certified precision calibration services for Vernier calipers, micrometers, steel rulers, tape
            measures, protractors, height gauges, and more. Ensure compliance with ISO standards and improve
            measurement reliability.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://i.postimg.cc/MKXGkBLk/Dimens.png"
              alt="Technician calibrating vernier caliper with standard block"
              className="rounded-xl shadow-lg w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Why Dimensional Calibration Matters
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Even a small deviation in your measuring tools can result in costly rework, rejected batches,
              and safety risks. Regular dimensional calibration ensures that your instruments provide
              accurate and consistent readings — essential for quality control in manufacturing, construction,
              and testing environments.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Micrometers, Vernier calipers, and dial indicators</li>
              <li>Steel rulers, height gauges, and precision tapes</li>
              <li>Gage blocks and slip gauges</li>
              <li>Comprehensive calibration certificates included</li>
              <li>Laboratory & on-site calibration options</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 bg-white-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
            Tools & Industries We Support
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Mechanical Workshops</h3>
              <p>Regular verification of hand tools like calipers and steel scales.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Construction Testing Labs</h3>
              <p>Calibration of tapes, depth gauges, and protractors for field accuracy.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Manufacturing & QC Labs</h3>
              <p>Traceable calibration of measuring blocks and micrometers used in inspection.</p>
            </div>
          </div>
        </div>
      </section>



<section className="py-16 bg-gray-50 border-t border-b">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DLEC?</h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-10">
      At Direct Line Engineering Corporation, we deliver precise, ISO-compliant calibration and repair services across Pakistan — trusted by industries nationwide.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
      {[
  {
    title: 'ISO Certification',
    desc: 'Our processes meet the highest international standards for calibration quality and consistency.',
    hoverColor: 'hover:bg-red-400',
  },
  {
    title: 'Fast Turnaround',
    desc: 'We understand downtime costs you money — that’s why we offer efficient, on-time service delivery.',
    hoverColor: 'hover:bg-green-300',
  },
  {
    title: 'Nationwide Service',
    desc: 'From Karachi to Peshawar, we offer calibration services across Pakistan’s key industrial regions.',
    hoverColor: 'hover:bg-yellow-200',
  },
  {
    title: 'On-Site & Lab Calibration',
    desc: 'Flexible service options at your location or in our state-of-the-art calibration lab.',
    hoverColor: 'hover:bg-blue-400',
  },
  {
    title: 'Expert Technicians',
    desc: 'Our skilled team is trained in multiple disciplines, ensuring accurate and reliable results every time.',
    hoverColor: 'hover:bg-rose-400',
  },
  {
    title: 'Complete Documentation',
    desc: 'Comprehensive, traceable certificates included with every job — audit-ready and fully compliant.',
    hoverColor: 'hover:bg-purple-500',
  },
].map((item, index) => (
  <div
    key={index}
    className={`bg-white shadow-md rounded-xl p-6 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:scale-105 ${item.hoverColor}`}
  >
    <h3 className="text-lg font-semibold text-black-600 mb-2">{item.title}</h3>
    <p className="text-gray-700">{item.desc}</p>
  </div>
))}

    </div>
  </div>
</section>



      {/* CTA Section */}
 <section className="py-16 bg-zinc-700 text-white text-center px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-4">
      Ensure Measurement Confidence Today
    </h2>
    <p className="mb-6 text-lg">
      Contact us now to book calibration for your linear and dimensional tools — with results you can trust.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link
        to="/contact"
        aria-label="Book dimensional calibration services"
        className="relative inline-block overflow-hidden group px-8 py-3 rounded-lg font-semibold bg-white text-blue-700 transition-all duration-300 ease-in-out hover:bg-gray-100 shadow hover:shadow-lg hover:scale-105"
      >
        <span className="relative z-10">Schedule Calibration</span>
        <span className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition duration-500 rounded-lg"></span>
      </Link>

      <a
        href="tel:03214182021"
        aria-label="Call DLEC now"
        className="relative inline-block overflow-hidden group px-8 py-3 rounded-lg font-semibold bg-blue-600 text-white transition-all duration-300 ease-in-out hover:bg-blue-700 shadow hover:shadow-lg hover:scale-105"
      >
        <span className="relative z-10">Call Now</span>
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500 rounded-lg"></span>
      </a>
    </div>
  </div>
</section>

    </div>
  );
};

export default LineLengthCalibrationPage;
