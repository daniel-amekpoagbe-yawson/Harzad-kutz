// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AppLayout from "./Pages/AppLayout";
// import Home from "./Pages/Home";
// import Booking from "./Pages/Booking";
// import Services from "./Components/Services";
// import Gallry from "./Components/Gallary";
// import NotFoundPage from "./Pages/NotFound";
// import AboutSection from "./Pages/About";
// import Blog from "./Pages/Blog";
// import BlogPost from "./Pages/BlogPost";
// import ScrollToTop from "./Components/ScrollToTop";
// import { Toaster } from "react-hot-toast";
// import HazardKutzBookingSystem from "./Bookings/BookingPage";
// // import HazardKutzBookingSystem from "./Bookings/BookingPage";
// // import 
// const App = () => {
//   return (
//     <Router>
//       <ScrollToTop />
//       <Toaster position="top-center" reverseOrder={false} />
//       <Routes>
//         <Route path="/" element={<AppLayout />}>
//           <Route index element={<Home />} />

//           {/* Add more routes here like Services, Gallery, etc. */}
//           <Route path="/services" element={<Services />} />
//           <Route path="/gallery" element={<Gallry />} />
//           <Route path="/about" element={<AboutSection />} />
//           <Route path="/booking" element={<Booking />} />
//           <Route path="/bookingpage" element={<HazardKutzBookingSystem />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/blog/:slug" element={<BlogPost />} />
//         </Route>

//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import Home from "./Pages/Home";
import Booking from "./Pages/Booking";
import Services from "./Components/Services";
import Gallry from "./Components/Gallary";
import NotFoundPage from "./Pages/NotFound";
import AboutSection from "./Pages/About";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import ScrollToTop from "./Components/ScrollToTop";
import { Toaster } from "react-hot-toast";

// Import the booking system components
import { 
  AuthProvider, 
  AdminLogin, 
  AdminDashboard, 
  ProtectedRoute,
  CustomerBookingPage 
} from "./Bookings/BookingPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Main App Routes with Layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallry />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Route>

          {/* Customer Booking Page - No Layout */}
          <Route path="/bookingpage" element={<CustomerBookingPage />} />

          {/* Admin Routes - No Layout, URL accessible only */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute element={<AdminDashboard />} />} 
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;