import { memo } from "react";
import { motion } from "framer-motion";
import { FaCut, FaMapMarkerAlt, FaClock, FaPhone } from "react-icons/fa";

const AboutSection = memo(function AboutSection() {
  const mapCoordinates = {
    lat: 5.666042304815915,
    lng: -0.2394081711626563,
    address: "Atomic Roundabout, Kwabenya",
    city: "Greater Accra, Ghana",
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="about" className="py-20 sm:py-8 bg-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 cinzel">
            About <span className="text-amber-400">Hazard Kutz</span>
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-2"></div>
          <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed text-lg bellefair">
            Your premier destination for exceptional haircuts and grooming
            services. We combine classic techniques with modern styles to give
            you the perfect look.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Story */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-amber-200">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-400 rounded-full mr-4">
                  <FaCut
                    className="text-white text-xl"
                    aria-label="Haircut Icon"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-500 cinzel">
                  Our Story
                </h3>
              </div>

              <div className="space-y-4 text-gray-800 bellefair text-lg">
                <p>
                  Founded in May 2025, Hazard Kutz began with a simple mission:
                  to provide premium barber services in a comfortable, modern
                  environment.
                </p>
                <p>
                  Our skilled barbers bring years of experience and passion to
                  every cut. We pride ourselves on attention to detail and
                  personalized service.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {/* Working Hours */}
                <div className="flex items-start">
                  <div className="p-2 bg-amber-100 rounded-full mr-3">
                    <FaClock
                      className="text-amber-400"
                      aria-label="Clock Icon"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-amber-500 bellefair text-lg">
                      Working Hours
                    </h4>
                    <p className="text-sm text-gray-700 bellefair">
                      Mon-Sat: 9AM - 8PM
                    </p>
                    <p className="text-sm text-gray-700 bellefair">
                      Sunday: 2:30 PM - 9:00 PM
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start">
                  <div className="p-2 bg-amber-100 rounded-full mr-3">
                    <FaPhone
                      className="text-amber-400"
                      aria-label="Phone Icon"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-amber-500 bellefair text-lg">
                      Contact Us
                    </h4>
                    <div>
                      <p className="text-sm text-gray-700 bellefair">
                        <a
                          href="tel:+233201234567"
                          className="hover:text-amber-500 underline"
                        >
                          Call Us
                        </a>
                      </p>
                      <p className="text-sm text-gray-700 bellefair">
                        <a
                          href="mailto:hazardkutzbarbershop@gmail.com"
                          className="hover:text-amber-500 underline"
                        >
                          Email Us
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Map Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-500 rounded-full mr-4">
                  <FaMapMarkerAlt
                    className="text-white text-xl"
                    aria-label="Location Icon"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-500 cinzel">
                  Find Us
                </h3>
              </div>

              {/* Google Maps Embed - Public */}
              <div className="h-64 sm:h-72 md:h-80 mb-6 rounded-lg overflow-hidden relative">
                <iframe
                  title="Hazard Kutz Barbershop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.030042191961!2d-0.2396442!3d5.6657754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f73aae370df%3A0x352abe4b62b40a71!2sHAZARD%20KUTZ%20BARBERSHOP!5e0!3m2!1sen!2sgh!4v1709371770000!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Address + Directions */}
              <div className="flex items-start">
                <div className="p-2 bg-amber-100 rounded-full mr-3 mt-1">
                  <FaMapMarkerAlt
                    className="text-amber-400"
                    aria-label="Map Marker Icon"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-amber-500 cinzel">
                    Address
                  </h4>
                  <p className="text-gray-700 bellefair">
                    {mapCoordinates.address}
                  </p>
                  <p className="text-gray-700 bellefair">
                    {mapCoordinates.city}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a
                      href="https://www.google.com/maps/place/HAZARD+KUTZ+BARBERSHOP-+Opening+Soon%F0%9F%93%8C/@5.665511,-0.239281,18z/data=!4m6!3m5!1s0xfdf9f73aae370df:0x352abe4b62b40a71!8m2!3d5.6657754!4d-0.2396442!16s%2Fg%2F11x6ypvt9x?hl=en&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm bg-amber-500 text-white px-4 py-2 bellefair rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      Get Directions (Google)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
