


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const services = {
  Haircuts: [
    {
      name: "Haircut",
      price: "₵70",
      description:
        "A clean, sharp haircut crafted to your preferred style. Perfect for maintaining your signature look.",
    },
    {
      name: "Haircut & Dye",
      price: "₵100",
      description:
        "Get a fresh cut paired with vibrant color application for a bold, standout appearance.",
    },
    {
      name: "Haircut & Waves (Men)",
      price: "₵170",
      description:
        "Designed for men who love the 360-wave look. Includes a precision cut and wave styling.",
    },
    {
      name: "Haircut & Curls (Ladies)",
      price: "₵200",
      description:
        "Tailored for women who prefer a fresh cut and defined curls. Soft, stylish, and full of bounce.",
    },
    {
      name: "Permcut",
      price: "₵200",
      description:
        "A combination of perm and haircut for lasting texture, volume, and a smooth, defined finish.",
    },
    {
      name: "Permcut & Bleach",
      price: "₵300",
      description:
        "Transform your look with a stylish permcut followed by a full bleach for a striking blonde tone.",
    },
    {
      name: "Permcut & Color",
      price: "₵350",
      description:
        "Add color to your permcut for a personalized, fashionable finish. Great for unique and trendy styles.",
    },
    {
      name: "Haircut & Bleach (Gold)",
      price: "₵170",
      description:
        "A modern golden-bleach finish with a clean haircut — ideal for clients who love a bright, standout look.",
    },
    {
      name: "Haircut & Dye (Color)",
      price: "₵250",
      description:
        "Combine a fresh haircut with a premium color treatment for a full style transformation.",
    },
  ],
  Grooming: [
    {
      name: "Shape / Line Up",
      price: "₵50",
      description:
        "Clean up your edges and lines with razor precision to maintain a neat, fresh appearance.",
    },
    {
      name: "Shape & Shave",
      price: "₵100",
      description:
        "Includes a full shape-up with an expert shave for a smooth and polished look.",
    },
    {
      name: "Eyebrow",
      price: "₵50",
      description:
        "Detailed eyebrow shaping to enhance your facial definition with finesse and accuracy.",
    },
    {
      name: "Piercing",
      price: "₵100",
      description:
        "Professional ear or nose piercing with clean, hygienic equipment and stylish precision.",
    },
  ],
};

// ✅ Updated tabs to match services keys
const tabs = ["Haircuts", "Grooming"];

function Services() {
  const [activeTab, setActiveTab] = useState("Haircuts");

  return (
    <div className="max-w-7xl pt-20 pb-16 px-6 bg-gray-900">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 mb-4 cinzel text-xs sm:text-sm font-medium tracking-widest text-amber-300 uppercase border border-amber-400">
          Our Services
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold cinzel text-white mb-4">
          Premium Grooming
        </h2>
        <div className="w-24 h-1 bg-amber-400 mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto bellefair leading-relaxed">
          Discover our range of expert services designed to enhance your style
          and confidence. Each service is performed by our master barbers with
          precision and care.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold cinzel tracking-wide uppercase transition-all duration-300 rounded-lg ${
              activeTab === tab
                ? "bg-amber-400 text-black shadow-lg"
                : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-amber-400 hover:text-amber-400"
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Services */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services[activeTab].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden relative hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold bellefair text-white">
                    {service.name}
                  </h3>
                  <span className="text-amber-400 text-xl sm:text-2xl cinzel font-bold">
                    {service.price}
                  </span>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>

                <p className="text-gray-300 text-sm sm:text-base md:text-lg bellefair leading-relaxed mb-8">
                  {service.description}
                </p>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute bottom-6 right-6"
                >
                  <button className="bg-amber-400 text-black font-bold uppercase tracking-wide text-[10px] sm:text-xs py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-amber-300 transition-all duration-300 shadow-lg hover:shadow-amber-400/25">
                    <Link to="/booking">Book Now</Link>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Services;
