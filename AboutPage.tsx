import { CheckCircle, RefreshCw, CalendarCheck2, PhoneCall, ClipboardList, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <ClipboardList className="text-indigo-600 w-6 h-6" />,
    title: 'Tailored Solutions',
    description: 'Customized calibration programs based on your specific equipment, compliance needs, and workflows.'
  },
  {
    icon: <ShieldCheck className="text-green-600 w-6 h-6" />,
    title: 'Clear Communication',
    description: 'Detailed reports, transparent discussions, and actionable recommendations at every stage.'
  },
  {
    icon: <CalendarCheck2 className="text-blue-600 w-6 h-6" />,
    title: 'Flexible Service Delivery',
    description: 'Choose between on-site or in-lab services—whatever suits your schedule and operations best.'
  },
  {
    icon: <RefreshCw className="text-yellow-600 w-6 h-6" />,
    title: 'Proactive Partnership',
    description: 'Routine calibration scheduling to prevent drift and reduce unexpected downtime.'
  },
  {
    icon: <PhoneCall className="text-pink-600 w-6 h-6" />,
    title: 'Support Beyond Calibration',
    description: 'Technical guidance and regular follow-ups to keep your systems compliant and competitive.'
  },
];

const outcomes = [
  "Improved Equipment Performance",
  "Enhanced Regulatory Compliance",
  "Reduced Operational Risks",
  "Greater Peace of Mind"
];

// Motion Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const CustomerCentricApproach = () => {
  return (
    <motion.section 
      className="pt-32 pb-20 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            DLEC: The Proactive Calibration Vendor
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At DLEC, we go beyond calibration—offering a proactive and customer-first approach that ensures precision, trust, and operational success across industries.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                {feature.icon}
                <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What This Means for You</h3>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="text-gray-700 space-y-3 text-base"
          >
            {outcomes.map((item, i) => (
              <motion.li
                key={i}
                variants={cardVariants}
                className="flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CustomerCentricApproach;
