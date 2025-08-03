import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Clock, Award } from 'lucide-react';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert('Your quote request has been submitted!');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-16">
      <Helmet>
        <title>Contact Us | DLEC Calibration</title>
        <meta
          name="description"
          content="Request a quote or contact Direct Line Engineering Corporation for precision calibration services across Pakistan."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-blue-700">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to schedule your calibration service? Contact us today for a quote or to discuss your specific requirements.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Contact Information</h2>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="text-blue-700 mt-1" size={24} aria-hidden />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600 text-lg">0321-4182021</p>
                  <p className="text-sm text-gray-500 mt-1">Monday - Saturday, 9:00 AM - 5:00 PM PST</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="text-blue-700 mt-1" size={24} aria-hidden />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600 text-lg">calibrations.dlec@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                </div>
              </div>

              {/* Address */}
<div className="flex flex-col gap-4">
  <div className="flex items-start gap-4">
    <MapPin className="text-blue-700 mt-1" size={24} aria-hidden />
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
      <a
        href="https://www.google.com/maps/place/Direct+Line+Engineering+Corporation/@31.4193528,74.2760707,17z/data=!3m1!4b1!4m6!3m5!1s0x3919017e670ac103:0xe27757c3a11aeeab!8m2!3d31.4193482!4d74.2786456!16s%2Fg%2F11c2q2kx3b?entry=ttu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 text-lg underline hover:text-blue-800 transition"
      >
        284-E BLOCK PGECHS-2<br />College Road, Lahore, Pakistan
      </a>
    </div>
  </div>

  <iframe
    title="DLEC Location Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27225.09933828326!2d74.2760707!3d31.4193528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919017e670ac103%3A0xe27757c3a11aeeab!2sDirect%20Line%20Engineering%20Corporation!5e0!3m2!1sen!2s!4v1722345619739!5m2!1sen!2s"
    width="100%"
    height="250"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-lg shadow"
  ></iframe>
</div>

            </div>

            {/* Service Areas */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="text-blue-700" size={20} aria-hidden />
                Service Areas
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <div className="font-medium text-gray-900">Pakistan</div>
                  <div>Nationwide coverage</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Lahore</div>
                  <div>Head Office and Lab</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">All other Cities</div>
                  <div>Key industrial areas</div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-blue-700" size={20} aria-hidden />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Monday - Friday:</span><span className="font-medium">9:00 AM - 5:00 PM PST</span></div>
                <div className="flex justify-between"><span>Saturday:</span><span className="font-medium">9:00 AM - 5:00 PM PST</span></div>
                <div className="flex justify-between"><span>Sunday:</span><span className="font-medium">Closed</span></div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-blue-700 font-medium">Emergency calibration services available 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Request a Quote</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <input name="firstName" required type="text" placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input name="lastName" required type="text" placeholder="Enter your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <input name="email" required type="email" placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />

              <div className="grid md:grid-cols-2 gap-6">
                <input name="phone" type="tel" placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input name="company" required type="text" placeholder="Enter your company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <select name="service" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select a service</option>
                <option value="temperature">Temperature Calibration</option>
                <option value="line-length">Line Length Calibration</option>
                <option value="weighing">Weighing & Scales Calibration</option>
                <option value="sound">Sound Level Calibration</option>
                <option value="light">Light/Lux Meter Calibration</option>
                <option value="flow">Flow Equipment Calibration</option>
                <option value="electrical">Electrical Test Equipment Calibration</option>
                <option value="force">Force Calibration</option>
                <option value="construction">Construction Industry Calibration</option>
                <option value="multiple">Multiple Services</option>
                <option value="other">Other</option>
              </select>

              <select name="serviceType" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select service type</option>
                <option value="on-site">On-Site Calibration</option>
                <option value="lab">Laboratory Calibration</option>
                <option value="both">Both Options Available</option>
              </select>

              <select name="urgency" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="standard">Standard (1–2 weeks)</option>
                <option value="expedited">Expedited (3–5 days)</option>
                <option value="emergency">Emergency (24–48 hours)</option>
              </select>

              <textarea name="message" required rows={5} placeholder="Please describe your calibration requirements..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>

              <div className="flex items-start gap-3">
                <input type="checkbox" name="terms" required className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to receive communications from DLEC and understand my info will be handled according to privacy standards. *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'
                }`}
              >
                <Calendar size={20} />
                {isSubmitting ? 'Submitting...' : 'Request Quote & Schedule Service'}
              </button>

              <p className="text-sm text-gray-500 text-center">* Required fields. We'll respond to your inquiry within 24 hours.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DLEC for Your Calibration Needs?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference that precision, expertise, and commitment make in calibration services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Award className="text-blue-700 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">ISO Certified</h3>
            <p className="text-gray-600">Consistent, reliable calibration services that meet international standards.</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Clock className="text-blue-700 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Turnaround</h3>
            <p className="text-gray-600">Efficient on-site and lab services designed to minimize downtime.</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Phone className="text-blue-700 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
            <p className="text-gray-600">Emergency calibration available for critical and urgent needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
