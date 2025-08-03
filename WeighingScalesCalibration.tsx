import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle, Clock, Award, ArrowRight, Phone } from 'lucide-react';

const WeighingScalesCalibration = () => {
  const equipment = [
    "Analytical balances",
    "Precision scales",
    "Industrial scales",
    "Laboratory balances",
    "Bench scales",
    "Floor scales",
    "Crane scales",
    "Calibration weights"
  ];

  const applications = [
    {
      title: "Laboratory Research",
      description: "Precise measurements for scientific research and analysis requiring high accuracy and repeatability."
    },
    {
      title: "Pharmaceutical Manufacturing",
      description: "Critical weight measurements for drug formulation and quality control in pharmaceutical production."
    },
    {
      title: "Food Processing",
      description: "Accurate weighing for recipe formulation, portion control, and regulatory compliance in food industry."
    },
    {
      title: "Chemical Industry",
      description: "Precise measurements for chemical formulations, batch processing, and safety compliance."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Scale className="text-purple-600" size={48} />
                <span className="text-6xl">⚖️</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Weighing & Scales <span className="text-purple-600">Calibration Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional calibration for laboratory balances, scales, and weights with traceable certificates. Fast, reliable service for all weighing applications ensuring accuracy and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link 
                  to="/contact"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a 
                  href="tel:0321-4182021"
                  className="border border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a> */}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i.postimg.cc/1RvZnknf/weigh.jpg" 
                alt="Precision scale calibration" 
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Weighing Equipment We Calibrate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive calibration services for all types of weighing instruments from micro-balances to industrial scales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-6 text-center">
                <Scale className="text-purple-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Calibration Capabilities</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Weight Range</span>
                  <span className="text-gray-600">0.1mg to 50,000kg</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Accuracy Class</span>
                  <span className="text-gray-600">OIML Class E1 to M3</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Uncertainty</span>
                  <span className="text-gray-600">As low as ±0.01mg</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Standards</span>
                  <span className="text-gray-600">NIST Class F weights</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-900">Traceability</span>
                  <span className="text-gray-600">SI kilogram</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Weighing Calibration</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our weighing and scales calibration services ensure your instruments provide accurate, reliable measurements critical for quality control, research, and regulatory compliance.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Award className="text-purple-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Traceable Certificates</h3>
                    <p className="text-gray-600">All calibrations include certificates traceable to national standards for regulatory compliance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-purple-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fast Service</h3>
                    <p className="text-gray-600">Quick turnaround times to minimize disruption to your operations and workflows.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-purple-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                    <p className="text-gray-600">ISO 9001:2015 certified processes ensuring consistent, high-quality calibration services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our weighing calibration services support critical applications across industries requiring precise mass measurements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-8">
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
        Our calibration services comply with international standards and are traceable to Pakistan’s National Metrology Institute, ensuring accuracy and regulatory alignment.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white rounded-xl p-8 shadow-lg text-center">
        <Award className="text-purple-600 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 mb-4">ISO Certified</h3>
        <p className="text-gray-600">We operate under a certified ISO Quality Management System, ensuring reliable and consistent calibration practices.</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg text-center">
        <CheckCircle className="text-purple-600 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 mb-4">National Traceability</h3>
        <p className="text-gray-600">All calibration results are traceable to the National Standards.</p>
      </div>

<div className="bg-white rounded-xl p-8 shadow-lg text-center">
  <Scale className="text-purple-600 mx-auto mb-4" size={48} />
  <h3 className="text-xl font-semibold text-gray-900 mb-4">Standards</h3>
  <p className="text-gray-600">
    Our calibration services follow internationally recognized practices and are aligned with requirements set by the for technical competence.
  </p>
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
              A systematic approach ensuring accurate, reliable, and traceable weighing calibration results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Calibration</h3>
              <p className="text-gray-600">Inspect equipment condition and perform initial assessment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calibration</h3>
              <p className="text-gray-600">Perform calibration using certified reference weights</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification</h3>
              <p className="text-gray-600">Verify calibration results and perform quality checks</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certification</h3>
              <p className="text-gray-600">Issue traceable calibration certificate and documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ensure Accurate Weighing with Professional Calibration</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Trust DLEC for precise weighing and scales calibration services that ensure accuracy, compliance, and reliability for your critical measurements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                 className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center gap-2"

                >
                  Get Quote <ArrowRight size={20} />
                </Link>
                <a 
                  href="tel:0321-4182021"
                  className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Call Now
                </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeighingScalesCalibration;