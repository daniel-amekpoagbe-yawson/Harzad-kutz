import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import {
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Add Cinzel and Bellefair fonts via CDN (for demo, should be in index.html for production)
if (typeof document !== "undefined") {
  const cinzel = document.createElement("link");
  cinzel.href =
    "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap";
  cinzel.rel = "stylesheet";
  document.head.appendChild(cinzel);
  const bellefair = document.createElement("link");
  bellefair.href =
    "https://fonts.googleapis.com/css2?family=Bellefair&display=swap";
  bellefair.rel = "stylesheet";
  document.head.appendChild(bellefair);
}

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white font-[Cinzel]">
      {/* Upper Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-start justify-center mb-8 text-left lg:items-center lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1 mb-4 text-xs sm:text-sm font-medium tracking-widest text-amber-300 uppercase border border-amber-400 font-[Cinzel]">
              Connect With Us
            </span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white font-[Cinzel]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience{" "}
            <span className="text-amber-400 font-[Bellefair]">
              Premium Grooming
            </span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-amber-400 mb-6 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/+233559891727"
              className="text-gray-700 hover:text-green-600 p-2 transition-all duration-200 rounded-lg hover:bg-gray-100"
            >
              <FaWhatsapp className="w-7 h-7" />
            </a>

            <a
              href="https://www.instagram.com/hazard_kutz_barbershop?igsh=MW9rNThicXgwd2h3&utm_source=qr"
              className="text-gray-700 hover:text-pink-600 p-2 transition-all duration-200 rounded-lg hover:bg-gray-100"
            >
              <FaInstagram className="w-7 h-7" />
            </a>

            <a
              href="https://www.tiktok.com/@hazardkutz?_t=ZS-8vzjYp7RS1i&_r=1"
              className="text-gray-700 hover:text-black p-2 transition-all duration-200 rounded-lg hover:bg-gray-100"
            >
              <FaTiktok className="w-7 h-7" />
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-gray-800 pt-10">
          {/* Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-start text-left"
          >
            <img
              src={logo}
              alt="Harzad Cutz"
              className="w-32 mb-4 rounded-lg shadow-lg"
            />
            <p className="text-gray-400 text-sm sm:text-base mt-2 font-[Bellefair] max-w-xs">
              Since 2024, Hazard Kutz has been delivering premium grooming
              services with precision and style.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col items-start text-left"
          >
            <h3 className="text-amber-400 font-bold text-base sm:text-lg mb-4 sm:mb-6 font-[Cinzel] tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Services", path: "/services" },
                { label: "Gallery", path: "/gallery" },
                { label: "About", path: "/about" },
                { label: "Booking", path: "/booking" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-gray-300 hover:text-amber-400 transition duration-300 font-[Bellefair] text-sm sm:text-base"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-start text-left"
          >
            <h3 className="text-amber-400 font-bold text-base sm:text-lg mb-4 sm:mb-6 font-[Cinzel] tracking-wide">
              Business Hours
            </h3>
            <ul className="space-y-3 font-[Bellefair] text-sm sm:text-base">
              <li className="flex flex-col sm:flex-row sm:justify-between w-full">
                <span className="text-gray-300 font-medium">Mon-Sat:</span>
                <span className="text-gray-400 ml-1">9:00AM - 8:30PM</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between w-full">
                <span className="text-gray-300 font-medium">Sunday:</span>
                <span className="text-gray-400">2:30PM - 9:00PM</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col items-start text-left w-full"
          >
            <h3 className="text-amber-400 font-bold text-base sm:text-lg mb-4 sm:mb-6 font-[Cinzel] tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-4 font-[Bellefair] text-sm sm:text-base w-full">
              <li className="flex items-start gap-3 w-full">
                <FaMapMarkerAlt className="text-amber-400 mt-1" />
                <a
                  href="https://www.google.com/maps/place/HAZARD+KUTZ+BARBERSHOP-+Opening+Soon%F0%9F%93%8C/@5.665511,-0.239281,18z/data=!4m6!3m5!1s0xfdf9f73aae370df:0x352abe4b62b40a71!8m2!3d5.6657754!4d-0.2396442!16s%2Fg%2F11x6ypvt9x?hl=en&entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
                  className="flex flex-col w-full"
                >
                  <span className="text-gray-400 text-xs sm:text-sm leading-tight w-full block">
                    ST JOHNS-DOME-KWABENYA
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm leading-tight w-full block">
                    GREATER ACCRA
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 w-full">
                <FaPhone className="text-amber-400" />
                <a
                  href="tel:+233559891727"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm sm:text-base break-all"
                >
                  (+233) 0559891727
                </a>
              </li>
              <li className="flex items-center gap-3 w-full">
                <FaEnvelope className="text-amber-400" />
                <a
                  href="mailto:info@hazardkutzbarbershop.com"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-[15px] break-all"
                >
                  info@hazardkutzbarbershop.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-6 text-left lg:text-center font-[Cinzel]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center text-sm text-gray-400">
            <div className="mb-4 lg:mb-0">
              <span className="inline-block px-4 py-1 text-xs font-medium tracking-widest text-amber-300 uppercase border border-amber-400 font-[Cinzel]">
                Est. May 2025
              </span>
            </div>
            <p>
              &copy; {currentYear}{" "}
              <span className="text-amber-400 text-sm font-[Bellefair]">
                Hazard Kutz
              </span>
              . All rights reserved.
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-left lg:text-center">
            Developed by{" "}
            <a
              href="https://wa.me/+233245870688" // Replace with your actual portfolio link
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-500 text-base font-[Bellefair]"
            >
              swasty-jay
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
