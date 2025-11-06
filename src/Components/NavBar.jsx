

import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
  // State for mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open (locks background)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Social media links configuration
  const socialLinks = [
    {
      href: "https://wa.me/+233559891727",
      icon: FaWhatsapp,
      hoverColor: "hover:text-green-600",
      label: "WhatsApp",
    },
    {
      href: "https://www.instagram.com/hazard_kutz_barbershop?igsh=MW9rNThicXgwd2h3&utm_source=qr",
      icon: FaInstagram,
      hoverColor: "hover:text-pink-600",
      label: "Instagram",
    },
    {
      href: "https://www.tiktok.com/@hazardkutz?_t=ZS-8vzjYp7RS1i&_r=1",
      icon: FaTiktok,
      hoverColor: "hover:text-black",
      label: "TikTok",
    },
  ];

  // Navigation links configuration
  const navLinks = [
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blog", label: "Blog" },
    {to:'/bookingpage', label:'Booking'}
  ];

  return (
    <>
      {/* ========== DESKTOP NAVBAR ========== */}
      {/* Sticky navbar that shows only on medium screens and above */}
      <div className="hidden md:block w-full bg-[#eaecee]/40 backdrop-blur-sm shadow-sm rounded-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Desktop Logo */}
            <div className="text-xl sm:text-2xl cinzel italic text-gray-800 font-bold">
              <Link to="/">Hazard Kutz</Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8 text-base sm:text-lg cinzel">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Social Media Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-gray-700 ${social.hoverColor} p-2 transition-all duration-200 rounded-lg hover:bg-gray-100`}
                  aria-label={social.label}
                >
                  <social.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE NAVBAR ========== */}
      {/* Floating bar at top - shows only on small screens */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-center px-4 py-4 z-50">
        <div className="relative flex items-center justify-between bg-white/20 border border-white/30 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm mx-auto px-4 py-3 h-14">
          {/* Mobile Logo */}
          <div className="text-lg cinzel italic text-gray-800 font-semibold">
            <Link to="/">Hazard Kutz</Link>
          </div>

          {/* Right side: Social Icons + Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Mobile Social Media Icons */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-gray-800 ${social.hoverColor} p-1 transition-colors duration-200`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Menu Toggle Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-transparent text-gray-900 rounded-xl p-2  transition-all duration-200 "
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE FULLSCREEN MENU ========== */}
      {/* Full screen overlay that appears when menu is open */}
      <div
        className={`md:hidden fixed inset-0 bg-[#eaecee] z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Menu Content Wrapper */}
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Navigation Links - Vertically centered */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-3xl cinzel font-medium text-gray-800 hover:text-black transition-colors duration-200 text-center"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Book Us Now Button - Pinned to bottom */}
          <div className="mt-auto">
            <Link
              to="/bookingpage"
              className="block w-full bg-gray-800 text-white text-center py-4 rounded-xl cinzel text-lg font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg"
              onClick={() => setMenuOpen(false)}
            >
              Book Us Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
