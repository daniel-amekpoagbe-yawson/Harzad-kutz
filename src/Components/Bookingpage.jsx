// import React, { useState, useEffect } from "react";
// import {
//   Calendar,
//   Clock,
//   User,
//   Scissors,
//   DollarSign,
//   CheckCircle,
//   X,
//   Edit2,
//   Trash2,
//   Plus,
// } from "lucide-react";

// /**
//  * HAZARD KUTZ BARBERSHOP BOOKING SYSTEM
//  *
//  * A complete booking management system for barbershops
//  * Features: Appointment booking, barber selection, payment processing, admin dashboard
//  *
//  * SUPABASE SETUP INSTRUCTIONS:
//  * =============================
//  *
//  * 1. Create a new Supabase project at https://supabase.com
//  *
//  * 2. Run these SQL commands in your Supabase SQL Editor:
//  *
//  * -- Enable UUID extension
//  * CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
//  *
//  * -- Barbers table
//  * CREATE TABLE barbers (
//  *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//  *   name TEXT NOT NULL,
//  *   photo_url TEXT,
//  *   specialties TEXT[],
//  *   is_active BOOLEAN DEFAULT true,
//  *   created_at TIMESTAMP DEFAULT NOW()
//  * );
//  *
//  * -- Services table
//  * CREATE TABLE services (
//  *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//  *   name TEXT NOT NULL,
//  *   price DECIMAL(10,2) NOT NULL,
//  *   duration_minutes INTEGER NOT NULL,
//  *   description TEXT,
//  *   created_at TIMESTAMP DEFAULT NOW()
//  * );
//  *
//  * -- Bookings table
//  * CREATE TABLE bookings (
//  *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//  *   barber_id UUID REFERENCES barbers(id),
//  *   service_id UUID REFERENCES services(id),
//  *   customer_name TEXT NOT NULL,
//  *   customer_email TEXT NOT NULL,
//  *   customer_phone TEXT NOT NULL,
//  *   appointment_date DATE NOT NULL,
//  *   appointment_time TIME NOT NULL,
//  *   status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
//  *   payment_method TEXT, -- online, pay_at_shop
//  *   payment_status TEXT DEFAULT 'unpaid', -- paid, unpaid
//  *   is_walk_in BOOLEAN DEFAULT false,
//  *   notes TEXT,
//  *   created_at TIMESTAMP DEFAULT NOW(),
//  *   updated_at TIMESTAMP DEFAULT NOW()
//  * );
//  *
//  * -- Blocked time slots table (for breaks/days off)
//  * CREATE TABLE blocked_slots (
//  *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//  *   barber_id UUID REFERENCES barbers(id),
//  *   date DATE NOT NULL,
//  *   start_time TIME NOT NULL,
//  *   end_time TIME NOT NULL,
//  *   reason TEXT,
//  *   created_at TIMESTAMP DEFAULT NOW()
//  * );
//  *
//  * -- Customer accounts table (optional)
//  * CREATE TABLE customers (
//  *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//  *   name TEXT NOT NULL,
//  *   email TEXT UNIQUE NOT NULL,
//  *   phone TEXT,
//  *   created_at TIMESTAMP DEFAULT NOW()
//  * );
//  *
//  * 3. Set Row Level Security (RLS) policies:
//  *
//  * -- Enable RLS
//  * ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
//  * ALTER TABLE services ENABLE ROW LEVEL SECURITY;
//  * ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
//  * ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
//  *
//  * -- Public read access for barbers and services
//  * CREATE POLICY "Public can view barbers" ON barbers FOR SELECT USING (is_active = true);
//  * CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
//  *
//  * -- Public can create bookings
//  * CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);
//  *
//  * -- Customers can view their own bookings
//  * CREATE POLICY "Customers can view own bookings" ON bookings FOR SELECT USING (true);
//  *
//  * 4. Install Supabase client:
//  *    npm install @supabase/supabase-js
//  *
//  * 5. Create supabaseClient.js file:
//  *
//  * import { createClient } from '@supabase/supabase-js'
//  *
//  * const supabaseUrl = 'YOUR_SUPABASE_URL'
//  * const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
//  *
//  * export const supabase = createClient(supabaseUrl, supabaseKey)
//  *
//  * 6. Import and use in this component:
//  *    import { supabase } from './supabaseClient'
//  *
//  * 7. Replace all mock data fetch functions with real Supabase queries
//  */

// const HazardKutzBookingSystem = () => {
//   // ============= STATE MANAGEMENT =============
//   const [view, setView] = useState("booking"); // booking, admin
//   const [isAdmin, setIsAdmin] = useState(false); // Set to true for admin access

//   // Booking form state
//   const [selectedBarber, setSelectedBarber] = useState(null);
//   const [selectedService, setSelectedService] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [customerInfo, setCustomerInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("pay_at_shop");
//   const [bookingStep, setBookingStep] = useState(1); // 1: service, 2: barber, 3: date/time, 4: details, 5: confirmation

//   // Admin state
//   const [adminFilter, setAdminFilter] = useState("all"); // all, today, upcoming, cancelled
//   const [showBlockSlotModal, setShowBlockSlotModal] = useState(false);
//   const [showWalkInModal, setShowWalkInModal] = useState(false);

//   // Data state
//   const [barbers, setBarbers] = useState([]);
//   const [services, setServices] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ============= MOCK DATA (Replace with Supabase queries) =============
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     // TODO: Replace with Supabase queries
//     // const { data: barbersData } = await supabase.from('barbers').select('*').eq('is_active', true);
//     // const { data: servicesData } = await supabase.from('services').select('*');

//     setBarbers([
//       {
//         id: "1",
//         name: 'Marcus "The Fade King" Johnson',
//         photoUrl:
//           "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
//         specialties: ["Fades", "Line-ups", "Beard Sculpting"],
//       },
//       {
//         id: "2",
//         name: 'Andre "Precision" Williams',
//         photoUrl:
//           "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
//         specialties: ["Classic Cuts", "Hot Towel Shave", "VIP Service"],
//       },
//       {
//         id: "3",
//         name: 'Jay "Fresh" Thompson',
//         photoUrl:
//           "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
//         specialties: ["Modern Styles", "Kids Cuts", "Hair Designs"],
//       },
//     ]);

//     setServices([
//       {
//         id: "1",
//         name: "Regular Haircut",
//         price: 50,
//         duration: 30,
//         description: "Classic cut with line-up",
//       },
//       {
//         id: "2",
//         name: "Fade Cut",
//         price: 70,
//         duration: 45,
//         description: "Premium fade with styling",
//       },
//       {
//         id: "3",
//         name: "Beard Trim",
//         price: 30,
//         duration: 20,
//         description: "Shape and trim with hot towel",
//       },
//       {
//         id: "4",
//         name: "Kids Cut",
//         price: 40,
//         duration: 30,
//         description: "Haircut for children under 12",
//       },
//       {
//         id: "5",
//         name: "VIP Full Service",
//         price: 120,
//         duration: 60,
//         description: "Haircut, beard trim, hot towel, massage",
//       },
//     ]);

//     setBookings([
//       {
//         id: "1",
//         barberName: "Marcus Johnson",
//         serviceName: "Fade Cut",
//         customerName: "John Doe",
//         customerEmail: "john@example.com",
//         customerPhone: "0244123456",
//         date: "2025-10-17",
//         time: "10:00",
//         status: "confirmed",
//         paymentMethod: "pay_at_shop",
//         paymentStatus: "unpaid",
//       },
//     ]);
//   };

//   // ============= TIME SLOT GENERATION =============
//   const generateTimeSlots = (date, barberId) => {
//     // Business hours: 9 AM to 7 PM
//     const slots = [];
//     const startHour = 9;
//     const endHour = 19;

//     for (let hour = startHour; hour < endHour; hour++) {
//       slots.push(`${hour.toString().padStart(2, "0")}:00`);
//       slots.push(`${hour.toString().padStart(2, "0")}:30`);
//     }

//     // TODO: Filter out booked slots from Supabase
//     // const { data: bookedSlots } = await supabase
//     //   .from('bookings')
//     //   .select('appointment_time')
//     //   .eq('barber_id', barberId)
//     //   .eq('appointment_date', date)
//     //   .neq('status', 'cancelled');

//     // TODO: Filter out blocked slots
//     // const { data: blockedSlots } = await supabase
//     //   .from('blocked_slots')
//     //   .select('start_time, end_time')
//     //   .eq('barber_id', barberId)
//     //   .eq('date', date);

//     return slots;
//   };

//   useEffect(() => {
//     if (selectedDate && selectedBarber) {
//       const slots = generateTimeSlots(selectedDate, selectedBarber.id);
//       setAvailableSlots(slots);
//     }
//   }, [selectedDate, selectedBarber]);

//   // ============= BOOKING HANDLERS =============
//   const handleServiceSelect = (service) => {
//     setSelectedService(service);
//     setBookingStep(2);
//   };

//   const handleBarberSelect = (barber) => {
//     setSelectedBarber(barber);
//     setBookingStep(3);
//   };

//   const handleDateTimeSelect = () => {
//     if (selectedDate && selectedTime) {
//       setBookingStep(4);
//     }
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // TODO: Replace with Supabase insert
//       // const { data, error } = await supabase
//       //   .from('bookings')
//       //   .insert([
//       //     {
//       //       barber_id: selectedBarber.id,
//       //       service_id: selectedService.id,
//       //       customer_name: customerInfo.name,
//       //       customer_email: customerInfo.email,
//       //       customer_phone: customerInfo.phone,
//       //       appointment_date: selectedDate,
//       //       appointment_time: selectedTime,
//       //       payment_method: paymentMethod,
//       //       status: 'pending'
//       //     }
//       //   ]);

//       // if (error) throw error;

//       // Mock success
//       setTimeout(() => {
//         setBookingStep(5);
//         setLoading(false);

//         // TODO: Send confirmation email/SMS
//         // You can use Supabase Edge Functions or a service like Twilio/SendGrid
//       }, 1000);
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert("Failed to create booking. Please try again.");
//       setLoading(false);
//     }
//   };

//   const resetBooking = () => {
//     setBookingStep(1);
//     setSelectedService(null);
//     setSelectedBarber(null);
//     setSelectedDate("");
//     setSelectedTime("");
//     setCustomerInfo({ name: "", email: "", phone: "" });
//     setPaymentMethod("pay_at_shop");
//   };

//   // ============= ADMIN HANDLERS =============
//   const handleCancelBooking = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?"))
//       return;

//     // TODO: Update booking status in Supabase
//     // const { error } = await supabase
//     //   .from('bookings')
//     //   .update({ status: 'cancelled' })
//     //   .eq('id', bookingId);

//     setBookings(
//       bookings.map((b) =>
//         b.id === bookingId ? { ...b, status: "cancelled" } : b
//       )
//     );
//   };

//   const handleCompleteBooking = async (bookingId) => {
//     // TODO: Update booking status in Supabase
//     setBookings(
//       bookings.map((b) =>
//         b.id === bookingId
//           ? { ...b, status: "completed", paymentStatus: "paid" }
//           : b
//       )
//     );
//   };

//   const handleAddWalkIn = async (walkInData) => {
//     // TODO: Insert walk-in booking to Supabase with is_walk_in = true
//     setShowWalkInModal(false);
//     loadInitialData(); // Reload bookings
//   };

//   // ============= FILTERED BOOKINGS =============
//   const getFilteredBookings = () => {
//     const today = new Date().toISOString().split("T")[0];

//     switch (adminFilter) {
//       case "today":
//         return bookings.filter(
//           (b) => b.date === today && b.status !== "cancelled"
//         );
//       case "upcoming":
//         return bookings.filter(
//           (b) => b.date >= today && b.status !== "cancelled"
//         );
//       case "cancelled":
//         return bookings.filter((b) => b.status === "cancelled");
//       default:
//         return bookings;
//     }
//   };

//   // ============= RENDER FUNCTIONS =============

//   // Service Selection Step
//   const renderServiceSelection = () => (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Select Your Service
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {services.map((service) => (
//           <div
//             key={service.id}
//             onClick={() => handleServiceSelect(service)}
//             className="border-2 border-gray-200 rounded-lg p-6 hover:border-red-600 hover:shadow-lg transition-all cursor-pointer"
//           >
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-800">
//                   {service.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {service.description}
//                 </p>
//                 <div className="flex items-center gap-4 mt-4">
//                   <span className="text-xl font-bold text-red-600">
//                     GH₵{service.price}
//                   </span>
//                   <span className="text-sm text-gray-500">
//                     {service.duration} mins
//                   </span>
//                 </div>
//               </div>
//               <Scissors className="w-8 h-8 text-red-600" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Barber Selection Step
//   const renderBarberSelection = () => (
//     <div className="space-y-4">
//       <button
//         onClick={() => setBookingStep(1)}
//         className="text-red-600 hover:text-red-700 flex items-center gap-2 mb-4"
//       >
//         ← Back to Services
//       </button>
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Choose Your Barber
//       </h2>
//       <p className="text-gray-600 mb-6">Selected: {selectedService?.name}</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {barbers.map((barber) => (
//           <div
//             key={barber.id}
//             onClick={() => handleBarberSelect(barber)}
//             className="border-2 border-gray-200 rounded-lg p-6 hover:border-red-600 hover:shadow-lg transition-all cursor-pointer"
//           >
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={barber.photoUrl}
//                 alt={barber.name}
//                 className="w-24 h-24 rounded-full object-cover mb-4"
//               />
//               <h3 className="font-bold text-gray-800">{barber.name}</h3>
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {barber.specialties.map((specialty, idx) => (
//                   <span
//                     key={idx}
//                     className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded"
//                   >
//                     {specialty}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Date and Time Selection Step
//   const renderDateTimeSelection = () => (
//     <div className="space-y-4">
//       <button
//         onClick={() => setBookingStep(2)}
//         className="text-red-600 hover:text-red-700 flex items-center gap-2 mb-4"
//       >
//         ← Back to Barbers
//       </button>
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//         Select Date & Time
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Service: {selectedService?.name} | Barber: {selectedBarber?.name}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             <Calendar className="w-4 h-4 inline mr-2" />
//             Choose Date
//           </label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             min={new Date().toISOString().split("T")[0]}
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             <Clock className="w-4 h-4 inline mr-2" />
//             Choose Time
//           </label>
//           {selectedDate ? (
//             <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
//               {availableSlots.map((slot) => (
//                 <button
//                   key={slot}
//                   onClick={() => setSelectedTime(slot)}
//                   className={`p-2 rounded border-2 text-sm font-medium transition-all ${
//                     selectedTime === slot
//                       ? "bg-red-600 text-white border-red-600"
//                       : "border-gray-300 hover:border-red-600"
//                   }`}
//                 >
//                   {slot}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-sm">Please select a date first</p>
//           )}
//         </div>
//       </div>

//       {selectedDate && selectedTime && (
//         <button
//           onClick={handleDateTimeSelect}
//           className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors mt-6"
//         >
//           Continue to Details
//         </button>
//       )}
//     </div>
//   );

//   // Customer Details Step
//   const renderCustomerDetails = () => (
//     <div className="space-y-4">
//       <button
//         onClick={() => setBookingStep(3)}
//         className="text-red-600 hover:text-red-700 flex items-center gap-2 mb-4"
//       >
//         ← Back to Date & Time
//       </button>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h2>

//       <form onSubmit={handleBookingSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Full Name *
//           </label>
//           <input
//             type="text"
//             required
//             value={customerInfo.name}
//             onChange={(e) =>
//               setCustomerInfo({ ...customerInfo, name: e.target.value })
//             }
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//             placeholder="Enter your full name"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email *
//           </label>
//           <input
//             type="email"
//             required
//             value={customerInfo.email}
//             onChange={(e) =>
//               setCustomerInfo({ ...customerInfo, email: e.target.value })
//             }
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//             placeholder="your.email@example.com"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Phone Number *
//           </label>
//           <input
//             type="tel"
//             required
//             value={customerInfo.phone}
//             onChange={(e) =>
//               setCustomerInfo({ ...customerInfo, phone: e.target.value })
//             }
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//             placeholder="0244123456"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Payment Method *
//           </label>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <button
//               type="button"
//               onClick={() => setPaymentMethod("pay_at_shop")}
//               className={`p-4 border-2 rounded-lg font-medium transition-all ${
//                 paymentMethod === "pay_at_shop"
//                   ? "bg-red-600 text-white border-red-600"
//                   : "border-gray-300 hover:border-red-600"
//               }`}
//             >
//               <DollarSign className="w-6 h-6 mx-auto mb-2" />
//               Pay at Shop
//             </button>
//             <button
//               type="button"
//               onClick={() => setPaymentMethod("online")}
//               className={`p-4 border-2 rounded-lg font-medium transition-all ${
//                 paymentMethod === "online"
//                   ? "bg-red-600 text-white border-red-600"
//                   : "border-gray-300 hover:border-red-600"
//               }`}
//             >
//               <DollarSign className="w-6 h-6 mx-auto mb-2" />
//               Pay Online
//             </button>
//           </div>
//         </div>

//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="font-bold text-gray-800 mb-2">Booking Summary</h3>
//           <div className="space-y-1 text-sm">
//             <p>
//               <span className="font-medium">Service:</span>{" "}
//               {selectedService?.name}
//             </p>
//             <p>
//               <span className="font-medium">Barber:</span>{" "}
//               {selectedBarber?.name}
//             </p>
//             <p>
//               <span className="font-medium">Date:</span> {selectedDate}
//             </p>
//             <p>
//               <span className="font-medium">Time:</span> {selectedTime}
//             </p>
//             <p className="text-lg font-bold text-red-600 mt-2">
//               Total: GH₵{selectedService?.price}
//             </p>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:bg-gray-400"
//         >
//           {loading ? "Processing..." : "Confirm Booking"}
//         </button>
//       </form>
//     </div>
//   );

//   // Confirmation Step
//   const renderConfirmation = () => (
//     <div className="text-center space-y-6 py-8">
//       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//         <CheckCircle className="w-12 h-12 text-green-600" />
//       </div>
//       <h2 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h2>
//       <p className="text-gray-600 max-w-md mx-auto">
//         Your appointment has been successfully booked. We've sent a confirmation
//         to {customerInfo.email}
//       </p>

//       <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto text-left">
//         <h3 className="font-bold text-gray-800 mb-3">Appointment Details</h3>
//         <div className="space-y-2 text-sm">
//           <p>
//             <span className="font-medium">Service:</span>{" "}
//             {selectedService?.name}
//           </p>
//           <p>
//             <span className="font-medium">Barber:</span> {selectedBarber?.name}
//           </p>
//           <p>
//             <span className="font-medium">Date:</span> {selectedDate}
//           </p>
//           <p>
//             <span className="font-medium">Time:</span> {selectedTime}
//           </p>
//           <p>
//             <span className="font-medium">Payment:</span>{" "}
//             {paymentMethod === "online" ? "Paid Online" : "Pay at Shop"}
//           </p>
//           <p className="text-lg font-bold text-red-600 mt-3">
//             Total: GH₵{selectedService?.price}
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={resetBooking}
//         className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
//       >
//         Book Another Appointment
//       </button>
//     </div>
//   );

//   // Admin Dashboard
//   const renderAdminDashboard = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
//         <button
//           onClick={() => setShowWalkInModal(true)}
//           className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Add Walk-In
//         </button>
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex gap-2 border-b">
//         {["all", "today", "upcoming", "cancelled"].map((filter) => (
//           <button
//             key={filter}
//             onClick={() => setAdminFilter(filter)}
//             className={`px-4 py-2 font-medium capitalize transition-colors ${
//               adminFilter === filter
//                 ? "border-b-2 border-red-600 text-red-600"
//                 : "text-gray-600 hover:text-gray-800"
//             }`}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>

//       {/* Bookings Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left text-sm font-bold">Customer</th>
//               <th className="p-3 text-left text-sm font-bold">Service</th>
//               <th className="p-3 text-left text-sm font-bold">Barber</th>
//               <th className="p-3 text-left text-sm font-bold">Date & Time</th>
//               <th className="p-3 text-left text-sm font-bold">Status</th>
//               <th className="p-3 text-left text-sm font-bold">Payment</th>
//               <th className="p-3 text-left text-sm font-bold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getFilteredBookings().map((booking) => (
//               <tr key={booking.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">
//                   <div className="text-sm">
//                     <p className="font-medium">{booking.customerName}</p>
//                     <p className="text-gray-600 text-xs">
//                       {booking.customerPhone}
//                     </p>
//                   </div>
//                 </td>
//                 <td className="p-3 text-sm">{booking.serviceName}</td>
//                 <td className="p-3 text-sm">{booking.barberName}</td>
//                 <td className="p-3 text-sm">
//                   <div>
//                     <p>{booking.date}</p>
//                     <p className="text-gray-600">{booking.time}</p>
//                   </div>
//                 </td>
//                 <td className="p-3">
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full font-medium ${
//                       booking.status === "confirmed"
//                         ? "bg-green-100 text-green-700"
//                         : booking.status === "cancelled"
//                         ? "bg-red-100 text-red-700"
//                         : booking.status === "completed"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full font-medium ${
//                       booking.paymentStatus === "paid"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {booking.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   <div className="flex gap-2">
//                     {booking.status !== "cancelled" &&
//                       booking.status !== "completed" && (
//                         <>
//                           <button
//                             onClick={() => handleCompleteBooking(booking.id)}
//                             className="text-green-600 hover:text-green-700"
//                             title="Mark as completed"
//                           >
//                             <CheckCircle className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => handleCancelBooking(booking.id)}
//                             className="text-red-600 hover:text-red-700"
//                             title="Cancel booking"
//                           >
//                             <X className="w-5 h-5" />
//                           </button>
//                         </>
//                       )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {getFilteredBookings().length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             No bookings found for this filter
//           </div>
//         )}
//       </div>

//       {/* Walk-In Modal */}
//       {showWalkInModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold">Add Walk-In Customer</h3>
//               <button
//                 onClick={() => setShowWalkInModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 // TODO: Handle walk-in submission
//                 handleAddWalkIn({});
//               }}
//               className="space-y-4"
//             >
//               <input
//                 type="text"
//                 placeholder="Customer Name"
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//               />
//               <select
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//               >
//                 <option value="">Select Service</option>
//                 {services.map((service) => (
//                   <option key={service.id} value={service.id}>
//                     {service.name} - GH₵{service.price}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
//               >
//                 <option value="">Select Barber</option>
//                 {barbers.map((barber) => (
//                   <option key={barber.id} value={barber.id}>
//                     {barber.name}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="submit"
//                 className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
//               >
//                 Add Walk-In
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // ============= MAIN RENDER =============
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-6 shadow-lg">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">HAZARD KUTZ</h1>
//               <p className="text-red-200 text-sm mt-1">
//                 Premium Barbershop Experience
//               </p>
//             </div>

//             {/* Admin Toggle - Remove in production or add proper authentication */}
//             <button
//               onClick={() => {
//                 setIsAdmin(!isAdmin);
//                 setView(isAdmin ? "booking" : "admin");
//               }}
//               className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors text-sm"
//             >
//               {isAdmin ? "Customer View" : "Admin Login"}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
//           {view === "booking" ? (
//             <>
//               {/* Booking Steps Indicator */}
//               {bookingStep < 5 && (
//                 <div className="flex items-center justify-center mb-8">
//                   {[1, 2, 3, 4].map((step) => (
//                     <div key={step} className="flex items-center">
//                       <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
//                           bookingStep >= step
//                             ? "bg-red-600 text-white"
//                             : "bg-gray-200 text-gray-500"
//                         }`}
//                       >
//                         {step}
//                       </div>
//                       {step < 4 && (
//                         <div
//                           className={`w-16 h-1 ${
//                             bookingStep > step ? "bg-red-600" : "bg-gray-200"
//                           }`}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Render appropriate step */}
//               {bookingStep === 1 && renderServiceSelection()}
//               {bookingStep === 2 && renderBarberSelection()}
//               {bookingStep === 3 && renderDateTimeSelection()}
//               {bookingStep === 4 && renderCustomerDetails()}
//               {bookingStep === 5 && renderConfirmation()}
//             </>
//           ) : (
//             renderAdminDashboard()
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HazardKutzBookingSystem;
