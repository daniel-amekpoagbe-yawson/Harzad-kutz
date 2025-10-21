import { useState, useEffect } from "react";
import { Scissors, Calendar, MapPin, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  // State to control animation triggers - helps coordinate sequential animations
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations once component mounts - creates smooth entrance effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Simulated background image - replace with your actual image path
  const heroImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)), url('https://pzlomwaufewzsuzfuocw.supabase.co/storage/v1/object/public/photos/harzadkut.jpeg')`,
    backgroundSize: "cover",
    backgroundPosition: "50% 25%",
  };

  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 
        BACKGROUND LAYER
        - Uses animated div for subtle zoom-out effect (cinematic feel)
        - Gradient overlay ensures text readability across all screen sizes
        - Custom background-position keeps focus on the important part of the image
      */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-[8000ms] ease-out"
        style={{
          ...heroImageStyle,
          transform: isVisible ? "scale(1)" : "scale(1.1)",
        }}
      />

      {/* 
        MAIN CONTENT CONTAINER
        - z-20 ensures content appears above background
        - Flexbox centers all content vertically and horizontally
        - Responsive padding adapts to different screen sizes
      */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6  text-center">
        {/* 
          BADGE/TAGLINE - Small premium indicator
          - Appears first in animation sequence (delay: 200ms)
          - Adds professional credibility with icon
        */}
        <div
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-200/5 bg-opacity-10 border border-amber-400/30 border-opacity-30 rounded-[8px] backdrop-blur-sm">
            <Scissors className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-bold tracking-wider uppercase">
              Premium Grooming Experience
            </span>
          </div>
        </div>

        {/* 
          MAIN HEADLINE
          - Staggered animation for dramatic effect (delay: 400ms)
          - Two-line layout: Brand name + tagline
          - Responsive text sizing for mobile, tablet, and desktop
        */}
        <h1
          className={`text-center mb-6 transition-all cinzel duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Brand name - largest, most prominent text */}
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-2 tracking-tight leading-none">
            Hazard Kutz
          </span>

          {/* Tagline - contrasting color for visual hierarchy */}
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 italic tracking-wide">
            Master Your Look.
          </span>
        </h1>

        {/* 
          DESCRIPTION TEXT
          - Provides key information about services and location
          - Wider max-width for better readability
          - Softer gray color prevents overwhelming the headline
        */}
        <p
          className={`max-w-2xl text-base sm:text-lg bellefair md:text-xl text-gray-300 mb-4 leading-relaxed px-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          Precision cuts and refined grooming for men and boys, designed to
          leave a lasting impression. Experience excellence in every detail.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          {/* Primary CTA - encourages immediate booking */}
          <button
            className="px-4 py-3 bg-amber-400 text-black text-base font-extrabold uppercase tracking-wider rounded-lg hover:shadow-sm"
            onClick={() => console.log("Navigate to /booking")}
          >
            <span className="flex items-center justify-center bellefair  gap-2">
              <Clock className="w-5 h-5" />
              Book Appointment
            </span>
          </button>

          {/* Secondary CTA - explores services */}
          <button
            className="px-4 py-3 border-1 border-white/10 text-white bellefair text-base font-extrabold uppercase tracking-wider rounded-lg hover:border-amber-400 hover:text-amber-400 hover:bg-white hover:bg-opacity-10 hover:scale-101 active:scale-95 transition-all duration-300"
            onClick={() => navigate("/services")}
          >
            <span className="flex items-center justify-center gap-2">
              <Scissors className="w-5 h-5" />
              View Services
            </span>
          </button>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[400px] sm:max-w-[700px] w-full  bellefair transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          {/* Location card */}
          <div className="flex items-center justify-center gap-3 p-1 bg-white/5 bg-opacity-5 backdrop-blur-sm border border-white/10 border-opacity-10 rounded-lg hover:bg-opacity-10 transition-all duration-300">
            <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-left">
              <p className="text-white text-sm  font-semibold">
                Prime Location
              </p>
              <p className="text-gray-400 text-xs">Atomic Junction, Dome</p>
            </div>
          </div>

          {/* Hours card */}
          <div className="flex items-center justify-center gap-3 p-1 bg-white/5 bg-opacity-5 backdrop-blur-sm border border-white/10 border-opacity-10 rounded-lg hover:bg-opacity-10 transition-all duration-300">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Flexible Hours</p>
              <p className="text-gray-400 text-xs">6 Days a Week</p>
            </div>
          </div>
          {/*booking card*/}
          <div className="flex items-center justify-center gap-3 p-1 bg-white/5 bg-opacity-5 backdrop-blur-sm border border-white/10 border-opacity-10 rounded-lg hover:bg-opacity-10 transition-all duration-300">
            <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-left">
              <p className="text-white text-sm font-bold">Smooth Booking</p>
              <p className="text-gray-400 text-xs">
                Effortless barber bookings
              </p>
            </div>
          </div>
          {/* Quality card */}
          <div className="flex items-center justify-center gap-3 p-1 bg-white/5 bg-opacity-5 backdrop-blur-sm border border-white/10 border-opacity-10 rounded-lg hover:bg-opacity-10 transition-all duration-300">
            <Star className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-left">
              <p className="text-white text-sm font-bold">Expert Barbers</p>
              <p className="text-gray-400 text-xs">Premium Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
