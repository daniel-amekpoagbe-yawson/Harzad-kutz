import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCut, FaMapMarkerAlt, FaClock, FaPhone } from "react-icons/fa";

const AboutSection = memo(function AboutSection() {
  const mapCoordinates = {
    lat: 5.6657754,
    lng: 0.2396442,
    address: "St Johns - Dome - Kwabenya",
    city: "Greater Accra",
  };

  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapContainerRef.current) {
      if (!window.L) {
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
        document.head.appendChild(linkEl);

        const scriptEl = document.createElement("script");
        scriptEl.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
        scriptEl.onload = initMap;
        document.head.appendChild(scriptEl);
      } else {
        initMap();
      }
    }

    function initMap() {
      if (mapContainerRef.current._leaflet_id) return;

      const map = window.L.map(mapContainerRef.current).setView(
        [mapCoordinates.lat, mapCoordinates.lng],
        11
      );

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      window.L.marker([mapCoordinates.lat, mapCoordinates.lng])
        .addTo(map)
        .bindPopup(
          `<b class="cinzel">Hazard kutz</b><br><p className="text-gray-700 bellefair">
  ${mapCoordinates.address}
</p>`
        )
        .openPopup();

      window.L.circle([mapCoordinates.lat, mapCoordinates.lng], {
        radius: 300,
        color: "#ffb900",
        fillColor: "#fbbf24",
        fillOpacity: 0.15,
        weight: 2,
      }).addTo(map);

      setMapInstance(map);
      setMapLoaded(true);
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [
    mapCoordinates.lat,
    mapCoordinates.lng,
    mapCoordinates.address,
    mapInstance,
  ]);

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
    <section id="about" className="py-20 bg-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 cinzel">
            About <span className="text-amber-400">Hazard kutz</span>
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-2"></div>
          <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed text-lg bellefair">
            Your premier destination for exceptional haircuts and grooming
            services. We combine classic techniques with modern styles to give
            you the perfect look.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
                  Founded in May 2025, Hazard kutz began with a simple mission:
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

                <div className="flex items-start">
                  <div className="p-2 bg-amber-100 rounded-full mr-3">
                    <FaPhone
                      className="text-amber-400"
                      aria-label="Phone Icon"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-amber-500 backdrop bellefair text-lg">
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
                    className="text-white text-xl "
                    aria-label="Location Icon"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-500 cinzel">
                  Find Us
                </h3>
              </div>

              <div className="h-64 sm:h-72 md:h-80 min-h-[300px] mb-6 rounded-lg overflow-hidden relative">
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <span className="text-gray-500 text-lg bellefair">
                      Loading map...
                    </span>
                  </div>
                )}
                <div
                  ref={mapContainerRef}
                  className="w-full h-full border-0 rounded-lg"
                  role="region"
                  aria-label="Google Map showing shop location"
                  style={{ zIndex: 1 }}
                ></div>
              </div>

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
                      href={`https://www.google.com/maps/dir/?api=1&destination=${mapCoordinates.lat},${mapCoordinates.lng}`}
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
