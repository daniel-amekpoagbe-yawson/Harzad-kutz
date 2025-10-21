// import { useState, useRef, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRef = useRef();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close menu when scrolling
//   useEffect(() => {
//     const handleScroll = () => {
//       if (menuOpen) setMenuOpen(false);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [menuOpen]);

//   return (
//     <>
//       {/* Desktop NavBar - Sticky */}
//       <div className="hidden md:block w-full bg-white/75 backdrop-blur-sm shadow-sm rounded-sm sticky top-0 z-40">
//         <div className="max-w-6xl mx-auto px-4 py-2">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="text-xl sm:text-2xl cinzel italic text-gray-800 font-bold">
//               <Link to={"/"}> Hazard Kutz </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="flex items-center space-x-8 text-base sm:text-lg cinzel">
//               <Link
//                 to="/services"
//                 className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
//               >
//                 Services
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
//               >
//                 About
//               </Link>
//               <Link
//                 to="/gallery"
//                 className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
//               >
//                 Gallery
//               </Link>
//               {/* <Link
//                 to="/bookingpage"
//                 className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
//               >
//                 Booking
//               </Link> */}

//               <Link
//                 to="/blog"
//                 className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
//               >
//                 Blog
//               </Link>
//             </div>

//             {/* Desktop Social Icons */}
//             <div className="flex items-center space-x-4">
//               <a
//                 href="https://wa.me/+233559891727"
//                 className="text-gray-700 hover:text-green-600 p-2 transition-all duration-200 rounded-lg hover:bg-gray-100"
//               >
//                 <FaWhatsapp className="w-7 h-7" />
//               </a>

//               <a
//                 href="https://www.instagram.com/hazard_kutz_barbershop?igsh=MW9rNThicXgwd2h3&utm_source=qr"
//                 className="text-gray-700 hover:text-pink-600 p-2 transition-all duration-200 rounded-lg hover:bg-gray-100"
//               >
//                 <FaInstagram className="w-7 h-7" />
//               </a>

//               <a
//                 href="https://www.tiktok.com/@hazardkutz?_t=ZS-8vzjYp7RS1i&_r=1"
//                 className="text-gray-700 hover:text-black p-2 transition-all duration-200 rounded-lg hover:bg-gray-100"
//               >
//                 <FaTiktok className="w-7 h-7" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile NavBar - Floating */}
//       <div className="md:hidden fixed top-0 left-0 w-full flex justify-center px-4 py-4 z-50">
//         <div className="relative flex items-center justify-between bg-white/20 border border-white/30 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm mx-auto px-4 py-3 h-14">
//           {/* Mobile Logo */}
//           <div className="text-lg cinzel italic text-gray-800 font-semibold">
//             <Link to={"/"}> Hazard Kutz </Link>
//           </div>

//           {/* Mobile Social Icons + Menu */}
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center space-x-2">
//               <a
//                 href="https://wa.me/+233559891727"
//                 className="text-gray-800 hover:text-green-600 p-1 transition-colors duration-200"
//               >
//                 <FaWhatsapp className="w-5 h-5" />
//               </a>
//               <a
//                 href="https://www.instagram.com/hazard_kutz_barbershop?igsh=MW9rNThicXgwd2h3&utm_source=qr"
//                 className="text-gray-800 hover:text-pink-600 p-1 transition-colors duration-200"
//               >
//                 <FaInstagram className="w-5 h-5" />
//               </a>
//               <a
//                 href="https://www.tiktok.com/@hazardkutz?_t=ZS-8vzjYp7RS1i&_r=1"
//                 className="text-gray-800 hover:text-black p-1 transition-colors duration-200"
//               >
//                 <FaTiktok className="w-5 h-5" />
//               </a>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="bg-gray-800 text-white rounded-xl p-2 hover:bg-gray-700 transition-all duration-200 shadow-md"
//                 aria-label="Toggle menu"
//               >
//                 {menuOpen ? (
//                   <X className="w-5 h-5" />
//                 ) : (
//                   <Menu className="w-5 h-5" />
//                 )}
//               </button>

//               {/* Professional Mobile Dropdown */}
//               <div
//                 className={`absolute right-0 mt-3 w-80 h-screen bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 origin-top-right ${
//                   menuOpen
//                     ? "scale-100 opacity-100 translate-y-0"
//                     : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
//                 }`}
//               >
//                 {/* Dropdown Header */}
//                 <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-sm font-semibold cinzel text-gray-800">
//                       Hazard Kutz
//                     </span>
//                   </div>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="py-2 text-base bellefair">
//                   <Link
//                     to="/services"
//                     className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 border-l-4 border-transparent hover:border-gray-800"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     <span className="font-medium">Services</span>
//                   </Link>
//                   <Link
//                     to="/about"
//                     className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 border-l-4 border-transparent hover:border-gray-800"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     <span className="font-medium">About</span>
//                   </Link>
//                   <Link
//                     to="/gallery"
//                     className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 border-l-4 border-transparent hover:border-gray-800"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     <span className="font-medium">Gallery</span>
//                   </Link>

//                   <Link
//                     to="/blog"
//                     className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 border-l-4 border-transparent hover:border-gray-800"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     <span className="font-medium">Blog</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

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
