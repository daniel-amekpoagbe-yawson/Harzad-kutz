import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const services = {
  Featured: [
    {
      name: "Line Up / Shape Up",
      price: "₵25",
      description:
        "Master-crafted edge definition that highlights your best features. Our barbers use traditional techniques for razor-sharp precision.",
    },
    {
      name: "Beard Trim",
      price: "₵40",
      description:
        "Transform your facial hair with our premium beard styling service. Expertly shaped and defined for a distinguished gentleman's look.",
    },
    {
      name: "Kids Haircut",
      price: "₵50",
      description:
        "Start them young with style. Our kid-friendly approach ensures comfort while delivering age-appropriate cuts that parents love.",
    },
    {
      name: "Taper Fade",
      price: "₵60",
      description:
        "Our most requested service. Experience a flawless blend from skin to length, customized to complement your face shape and style.",
    },
    {
      name: "Duo Experience",
      price: "₵100",
      description:
        "Bring a friend and save. Two premium cuts with the same attention to detail and style that Hazard Kutz is known for.",
    },
  ],
  Waves: [
    {
      name: "For The Classic Men",
      price: "₵100",
      description:
        "Men who want to achieve a classic look with a modern twist. This service includes a detailed consultation to ensure the perfect style for your face shape and hair type.",
    },
    {
      name: "For The Modern Women",
      price: "₵70",
      description:
        "Custom wave styling that works with your natural texture. Ideal for creating movement and dimension in various hair types.",
    },
  ],
  Dye: [
    {
      name: "Gold Standard Blonde",
      price: "₵120",
      description:
        "Premium blonde transformation with careful attention to tone and hair health. Includes treatment to maintain strength and shine.",
    },
    {
      name: "Black Dye",
      price: "₵100",
      description:
        "Rich, deep black that enhances your natural color. Our formula is designed to provide maximum coverage while maintaining hair health.",
    },
    {
      name: "White Dye",
      price: "₵250",
      description:
        "The ultimate statement look. Our careful process achieves stunning white or platinum tones while protecting your hair.",
    },
  ],
  "Home Service": [
    {
      name: "Elite Experience",
      price: "₵300",
      description:
        "Bring the barbershop to you. Our master barbers deliver the full Hazard Kutz experience in the comfort and privacy of your home.",
    },
    {
      name: "Family Package",
      price: "₵500",
      description:
        "Perfect for families or groups. Enjoy premium haircuts and grooming services for up to four people, all in the comfort of your home.",
    },
  ],
};

const tabs = ["Featured", "Waves", "Dye", "Home Service"];

function Services() {
  const [activeTab, setActiveTab] = useState("Featured");

  return (
    <div className="max-w-7xl  pt-20 pb-16 px-6 bg-gray-900">
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
