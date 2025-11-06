// import { useState, useEffect, createContext, useContext } from "react";
// import {
//   Calendar,
//   Clock,
//   DollarSign,
//   CheckCircle,
//   Plus,
//   LogOut,
//   Lock,
//   Eye,
//   EyeOff,
//   Scissors,
//   Star,
//   Phone,
//   Mail,
//   MapPin,
//   X,
// } from "lucide-react";
// import { supabase } from "../libs/supabaseClient";



// // ============= AUTH CONTEXT =============
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [adminUser, setAdminUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAdminSession();
//   }, []);

//   const checkAdminSession = () => {
//     try {
//       const adminSession = sessionStorage.getItem('hazard_kutz_admin');
//       if (adminSession) {
//         const admin = JSON.parse(adminSession);
//         if (Date.now() - admin.loginTime < 24 * 60 * 60 * 1000) {
//           setAdminUser(admin);
//         } else {
//           sessionStorage.removeItem('hazard_kutz_admin');
//         }
//       }
//     } catch (error) {
//       console.error('Session check error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = (userData) => {
//     const session = {
//       id: userData.id,
//       email: userData.email,
//       name: userData.name,
//       loginTime: Date.now()
//     };
//     sessionStorage.setItem('hazard_kutz_admin', JSON.stringify(session));
//     setAdminUser(session);
//   };

//   const logout = () => {
//     sessionStorage.removeItem('hazard_kutz_admin');
//     setAdminUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ adminUser, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };

// // ============= ROUTER =============
// const Router = ({ children }) => {
//   const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

//   useEffect(() => {
//     const handleHashChange = () => {
//       setCurrentPath(window.location.hash.slice(1) || '/');
//     };
//     window.addEventListener('hashchange', handleHashChange);
//     return () => window.removeEventListener('hashchange', handleHashChange);
//   }, []);

//   const navigate = (path) => {
//     window.location.hash = path;
//     setCurrentPath(path);
//   };

//   return (
//     <RouterContext.Provider value={{ currentPath, navigate }}>
//       {children}
//     </RouterContext.Provider>
//   );
// };

// const RouterContext = createContext(null);

// const useRouter = () => {
//   const context = useContext(RouterContext);
//   if (!context) throw new Error('useRouter must be used within Router');
//   return context;
// };

// const Route = ({ path, element }) => {
//   const { currentPath } = useRouter();
//   return currentPath === path ? element : null;
// };

// const ProtectedRoute = ({ element }) => {
//   const { adminUser, loading } = useAuth();
//   const { navigate } = useRouter();

//   useEffect(() => {
//     if (!loading && !adminUser) {
//       navigate('/admin/login');
//     }
//   }, [adminUser, loading, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return adminUser ? element : null;
// };

// // ============= COMPONENTS =============
// const ServiceCard = ({ service, onSelect }) => (
//   <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer group"
//     onClick={() => onSelect(service)}>
//     <div className="flex items-start justify-between mb-4">
//       <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
//         <Scissors className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
//       </div>
//       <span className="text-2xl font-bold text-amber-600">GH₵{service.price}</span>
//     </div>
//     <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
//     <p className="text-gray-600 mb-3">{service.description}</p>
//     <div className="flex items-center text-sm text-gray-500">
//       <Clock className="w-4 h-4 mr-1" />
//       {service.duration} minutes
//     </div>
//   </div>
// );

// const BarberCard = ({ barber, onSelect }) => (
//   <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer group"
//     onClick={() => onSelect(barber)}>
//     <div className="aspect-square overflow-hidden bg-gray-200">
//       <img src={barber.photoUrl || 'https://via.placeholder.com/400'} alt={barber.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//     </div>
//     <div className="p-4">
//       <h3 className="text-lg font-bold text-gray-800 mb-2">{barber.name}</h3>
//       <div className="flex flex-wrap gap-1">
//         {barber.specialties?.map((specialty, idx) => (
//           <span key={idx} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
//             {specialty}
//           </span>
//         ))}
//       </div>
//       <div className="flex items-center mt-3 text-amber-600">
//         <Star className="w-4 h-4 fill-current" />
//         <Star className="w-4 h-4 fill-current" />
//         <Star className="w-4 h-4 fill-current" />
//         <Star className="w-4 h-4 fill-current" />
//         <Star className="w-4 h-4 fill-current" />
//         <span className="ml-2 text-sm text-gray-600">5.0</span>
//       </div>
//     </div>
//   </div>
// );

// const BookingSummary = ({ service, barber, date, time }) => (
//   <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
//     <h3 className="font-bold text-gray-800 mb-4 text-lg">Booking Summary</h3>
//     <div className="space-y-3">
//       <div className="flex justify-between items-center">
//         <span className="text-gray-600">Service:</span>
//         <span className="font-semibold text-gray-800">{service?.name}</span>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-gray-600">Barber:</span>
//         <span className="font-semibold text-gray-800">{barber?.name}</span>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-gray-600">Date:</span>
//         <span className="font-semibold text-gray-800">{date}</span>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-gray-600">Time:</span>
//         <span className="font-semibold text-gray-800">{time}</span>
//       </div>
//       <div className="border-t-2 border-amber-300 pt-3 mt-3">
//         <div className="flex justify-between items-center">
//           <span className="text-lg font-bold text-gray-800">Total:</span>
//           <span className="text-2xl font-bold text-amber-600">GH₵{service?.price}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const BookingTable = ({ bookings, onComplete, onCancel }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Barber</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {bookings.length === 0 ? (
//           <tr>
//             <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
//               No bookings found
//             </td>
//           </tr>
//         ) : (
//           bookings.map((booking) => (
//             <tr key={booking.id} className="hover:bg-gray-50">
//               <td className="px-4 py-3">
//                 <div className="text-sm font-medium text-gray-800">{booking.customerName}</div>
//                 <div className="text-xs text-gray-500">{booking.customerPhone}</div>
//               </td>
//               <td className="px-4 py-3 text-sm text-gray-800">{booking.serviceName}</td>
//               <td className="px-4 py-3 text-sm text-gray-800">{booking.barberName}</td>
//               <td className="px-4 py-3">
//                 <div className="text-sm text-gray-800">{booking.date}</div>
//                 <div className="text-xs text-gray-500">{booking.time}</div>
//               </td>
//               <td className="px-4 py-3">
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                   booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
//                   booking.status === 'completed' ? 'bg-green-100 text-green-800' :
//                   'bg-red-100 text-red-800'
//                 }`}>
//                   {booking.status}
//                 </span>
//                 {booking.isWalkIn && (
//                   <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
//                     Walk-in
//                   </span>
//                 )}
//               </td>
//               <td className="px-4 py-3">
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                   booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   {booking.paymentStatus}
//                 </span>
//               </td>
//               <td className="px-4 py-3">
//                 <div className="flex gap-2">
//                   {booking.status === 'confirmed' && (
//                     <button
//                       onClick={() => onComplete(booking.id)}
//                       className="text-green-600 hover:text-green-800 text-sm font-medium"
//                     >
//                       Complete
//                     </button>
//                   )}
//                   {booking.status !== 'cancelled' && booking.status !== 'completed' && (
//                     <button
//                       onClick={() => onCancel(booking.id)}
//                       className="text-red-600 hover:text-red-800 text-sm font-medium"
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>
// );

// const WalkInModal = ({ show, onClose, services, barbers, onSubmit }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-2xl font-bold text-gray-800">Add Walk-In Customer</h3>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <form onSubmit={onSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name *</label>
//               <input
//                 type="text"
//                 name="customer_name"
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
//                 placeholder="Enter customer name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
//               <input
//                 type="tel"
//                 name="customer_phone"
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
//                 placeholder="0244123456"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
//               <input
//                 type="email"
//                 name="customer_email"
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
//                 placeholder="customer@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Service *</label>
//               <select
//                 name="service_id"
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
//               >
//                 <option value="">Select a service</option>
//                 {services.map((service) => (
//                   <option key={service.id} value={service.id}>
//                     {service.name} - GH₵{service.price}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Barber *</label>
//               <select
//                 name="barber_id"
//                 required
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
//               >
//                 <option value="">Select a barber</option>
//                 {barbers.map((barber) => (
//                   <option key={barber.id} value={barber.id}>
//                     {barber.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-colors"
//               >
//                 Add Walk-In
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= ADMIN LOGIN =============
// const AdminLogin = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const { navigate } = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { data, error } = await supabase
//         .from('admin_users')
//         .select('*')
//         .eq('email', credentials.email)
//         .eq('password', credentials.password)
//         .eq('is_active', true)
//         .single();

//       if (error || !data) {
//         setError("Invalid credentials. Please try again.");
//         setLoading(false);
//         return;
//       }

//       login(data);
//       navigate('/admin/dashboard');
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//         <div className="flex justify-center mb-6">
//           <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
//             <Lock className="w-10 h-10 text-white" />
//           </div>
//         </div>
        
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Admin Portal</h2>
//         <p className="text-gray-600 text-center mb-8">Sign in to manage bookings</p>

//         {error && (
//           <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               required
//               value={credentials.email}
//               onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//               className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
//               placeholder="admin@hazardkutz.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none pr-10 transition-colors"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate('/')}
//             className="text-amber-600 hover:text-amber-700 font-medium"
//           >
//             ← Back to Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= ADMIN DASHBOARD =============
// const AdminDashboard = () => {
//   const { adminUser, logout } = useAuth();
//   const { navigate } = useRouter();
//   const [bookings, setBookings] = useState([]);
//   const [services, setServices] = useState([]);
//   const [barbers, setBarbers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [adminFilter, setAdminFilter] = useState("all");
//   const [showWalkInModal, setShowWalkInModal] = useState(false);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const [barbersRes, servicesRes, bookingsRes] = await Promise.all([
//         supabase.from('barbers').select('*').eq('is_active', true).order('name'),
//         supabase.from('services').select('*').eq('is_active', true).order('price'),
//         supabase.from('bookings').select(`
//           id, customer_name, customer_email, customer_phone, appointment_date,
//           appointment_time, status, payment_method, payment_status, is_walk_in,
//           barbers(name), services(name)
//         `).order('appointment_date', { ascending: false }).order('appointment_time', { ascending: false })
//       ]);

//       if (barbersRes.data) {
//         setBarbers(barbersRes.data.map(b => ({
//           id: b.id,
//           name: b.name,
//           photoUrl: b.photo_url,
//           specialties: b.specialties || []
//         })));
//       }

//       if (servicesRes.data) {
//         setServices(servicesRes.data.map(s => ({
//           id: s.id,
//           name: s.name,
//           description: s.description,
//           price: parseFloat(s.price),
//           duration: s.duration
//         })));
//       }

//       if (bookingsRes.data) {
//         setBookings(bookingsRes.data.map(b => ({
//           id: b.id,
//           customerName: b.customer_name,
//           customerEmail: b.customer_email,
//           customerPhone: b.customer_phone,
//           date: b.appointment_date,
//           time: b.appointment_time,
//           status: b.status,
//           paymentMethod: b.payment_method,
//           paymentStatus: b.payment_status,
//           isWalkIn: b.is_walk_in,
//           barberName: b.barbers?.name || 'Unknown',
//           serviceName: b.services?.name || 'Unknown'
//         })));
//       }
//     } catch (err) {
//       console.error('Error loading data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();

//     const bookingsSubscription = supabase
//       .channel('bookings_channel')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
//         loadData();
//       })
//       .subscribe();

//     return () => {
//       bookingsSubscription.unsubscribe();
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleCancelBooking = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       const { error } = await supabase
//         .from('bookings')
//         .update({ status: 'cancelled', updated_at: new Date().toISOString() })
//         .eq('id', bookingId);

//       if (error) throw error;
//       await loadData();
//     } catch (err) {
//       console.error('Cancel booking error:', err);
//       alert('Failed to cancel booking. Please try again.');
//     }
//   };

//   const handleCompleteBooking = async (bookingId) => {
//     try {
//       const { error } = await supabase
//         .from('bookings')
//         .update({ status: 'completed', payment_status: 'paid', updated_at: new Date().toISOString() })
//         .eq('id', bookingId);

//       if (error) throw error;
//       await loadData();
//     } catch (err) {
//       console.error('Complete booking error:', err);
//       alert('Failed to complete booking. Please try again.');
//     }
//   };

//   const handleAddWalkIn = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     try {
//       const { error } = await supabase
//         .from('bookings')
//         .insert([{
//           barber_id: formData.get('barber_id'),
//           service_id: formData.get('service_id'),
//           customer_name: formData.get('customer_name'),
//           customer_email: formData.get('customer_email') || 'walkin@hazardkutz.com',
//           customer_phone: formData.get('customer_phone'),
//           appointment_date: new Date().toISOString().split('T')[0],
//           appointment_time: new Date().toTimeString().substring(0, 5),
//           payment_method: 'pay_at_shop',
//           status: 'confirmed',
//           payment_status: 'unpaid',
//           is_walk_in: true
//         }]);

//       if (error) throw error;

//       setShowWalkInModal(false);
//       await loadData();
//     } catch (err) {
//       console.error('Add walk-in error:', err);
//       alert('Failed to add walk-in customer. Please try again.');
//     }
//   };

//   const getFilteredBookings = () => {
//     const today = new Date().toISOString().split("T")[0];

//     switch (adminFilter) {
//       case "today":
//         return bookings.filter(b => b.date === today && b.status !== "cancelled");
//       case "upcoming":
//         return bookings.filter(b => b.date >= today && b.status !== "cancelled");
//       case "cancelled":
//         return bookings.filter(b => b.status === "cancelled");
//       default:
//         return bookings;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 shadow-lg">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-amber-400">Hazard Kutz Admin</h1>
//             <p className="text-gray-300">Welcome, {adminUser?.name}</p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate('/')}
//               className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//             >
//               View Site
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Bookings Management</h2>
//             <button
//               onClick={() => setShowWalkInModal(true)}
//               className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center gap-2"
//             >
//               <Plus className="w-4 h-4" />
//               Add Walk-In
//             </button>
//           </div>

//           <div className="flex gap-2 border-b mb-6">
//             {["all", "today", "upcoming", "cancelled"].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setAdminFilter(filter)}
//                 className={`px-4 py-2 font-medium capitalize transition-colors ${
//                   adminFilter === filter
//                     ? "border-b-2 border-amber-600 text-amber-600"
//                     : "text-gray-600 hover:text-gray-800"
//                 }`}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>

//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading bookings...</p>
//             </div>
//           ) : (
//             <BookingTable
//               bookings={getFilteredBookings()}
//               onComplete={handleCompleteBooking}
//               onCancel={handleCancelBooking}
//             />
//           )}

//           <WalkInModal
//             show={showWalkInModal}
//             onClose={() => setShowWalkInModal(false)}
//             services={services}
//             barbers={barbers}
//             onSubmit={handleAddWalkIn}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= CUSTOMER BOOKING PAGE =============
// const BookingPage = () => {
//   const [bookingStep, setBookingStep] = useState(1);
//   const [selectedService, setSelectedService] = useState(null);
//   const [selectedBarber, setSelectedBarber] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });
//   const [paymentMethod, setPaymentMethod] = useState("pay_at_shop");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [services, setServices] = useState([]);
//   const [barbers, setBarbers] = useState([]);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const { navigate } = useRouter();

//   const loadInitialData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const { data: barbersData, error: barbersError } = await supabase
//         .from('barbers')
//         .select('*')
//         .eq('is_active', true)
//         .order('name');

//       if (barbersError) throw barbersError;

//       const { data: servicesData, error: servicesError } = await supabase
//         .from('services')
//         .select('*')
//         .eq('is_active', true)
//         .order('price');

//       if (servicesError) throw servicesError;

//       const formattedBarbers = barbersData.map(barber => ({
//         id: barber.id,
//         name: barber.name,
//         photoUrl: barber.photo_url,
//         specialties: barber.specialties || [],
//       }));

//       const formattedServices = servicesData.map(service => ({
//         id: service.id,
//         name: service.name,
//         description: service.description,
//         price: parseFloat(service.price),
//         duration: service.duration,
//       }));

//       setBarbers(formattedBarbers);
//       setServices(formattedServices);
//     } catch (err) {
//       console.error('Error loading data:', err);
//       setError('Failed to load data. Please refresh the page.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const generateTimeSlots = async (date, barberId) => {
//     const slots = [];
//     const startHour = 9;
//     const endHour = 19;

//     for (let hour = startHour; hour < endHour; hour++) {
//       slots.push(`${hour.toString().padStart(2, "0")}:00`);
//       slots.push(`${hour.toString().padStart(2, "0")}:30`);
//     }

//     try {
//       const { data: bookedSlots, error: bookingsError } = await supabase
//         .from('bookings')
//         .select('appointment_time')
//         .eq('barber_id', barberId)
//         .eq('appointment_date', date)
//         .neq('status', 'cancelled');

//       if (bookingsError) throw bookingsError;

//       const { data: blockedSlots, error: blockedError } = await supabase
//         .from('blocked_slots')
//         .select('start_time, end_time')
//         .eq('barber_id', barberId)
//         .eq('date', date);

//       if (blockedError) throw blockedError;

//       const unavailableTimes = new Set();

//       bookedSlots?.forEach(booking => {
//         unavailableTimes.add(booking.appointment_time.substring(0, 5));
//       });

//       blockedSlots?.forEach(blocked => {
//         const start = blocked.start_time.substring(0, 5);
//         const end = blocked.end_time.substring(0, 5);
        
//         slots.forEach(slot => {
//           if (slot >= start && slot < end) {
//             unavailableTimes.add(slot);
//           }
//         });
//       });

//       return slots.filter(slot => !unavailableTimes.has(slot));
//     } catch (err) {
//       console.error('Error generating time slots:', err);
//       return slots;
//     }
//   };

//   useEffect(() => {
//     const loadSlots = async () => {
//       if (selectedDate && selectedBarber) {
//         const slots = await generateTimeSlots(selectedDate, selectedBarber.id);
//         setAvailableSlots(slots);
//       }
//     };
//     loadSlots();
//   }, [selectedDate, selectedBarber]);

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
    
//     if (paymentMethod === "online") {
//       // Payment will be handled by Paystack button
//       return;
//     }

//     await submitBooking(null);
//   };

//   const submitBooking = async (paymentReference) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const { error } = await supabase
//         .from('bookings')
//         .insert([{
//           barber_id: selectedBarber.id,
//           service_id: selectedService.id,
//           customer_name: customerInfo.name,
//           customer_email: customerInfo.email,
//           customer_phone: customerInfo.phone,
//           appointment_date: selectedDate,
//           appointment_time: selectedTime,
//           payment_method: paymentMethod,
//           payment_reference: paymentReference,
//           status: 'confirmed',
//           payment_status: paymentMethod === 'online' ? 'paid' : 'unpaid',
//           is_walk_in: false
//         }])
//         .select();

//       if (error) throw error;

//       setBookingStep(5);
//     } catch (err) {
//       console.error('Booking error:', err);
//       setError('Failed to create booking. Please try again.');
//       alert('Failed to create booking. Please try again.');
//     } finally {
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
//     setError(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Hero Header */}
//       <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-amber-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-5xl font-bold text-amber-400 mb-2">Hazard Kutz</h1>
//               <p className="text-xl text-gray-300">Where Style Meets Precision</p>
//             </div>
//             <button
//               onClick={() => navigate('/admin/login')}
//               className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm border border-white/20"
//             >
//               Admin Login
//             </button>
//           </div>
          
//           {/* Contact Info */}
//           <div className="mt-8 flex flex-wrap gap-6 text-sm">
//             <div className="flex items-center gap-2">
//               <Phone className="w-4 h-4 text-amber-400" />
//               <span>+233 24 123 4567</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Mail className="w-4 h-4 text-amber-400" />
//               <span>book@hazardkutz.com</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <MapPin className="w-4 h-4 text-amber-400" />
//               <span>Accra, Ghana</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Progress Bar */}
//       {bookingStep < 5 && (
//         <div className="bg-white border-b">
//           <div className="max-w-4xl mx-auto px-4 py-6">
//             <div className="flex items-center justify-between">
//               {[1, 2, 3, 4].map((step) => (
//                 <div key={step} className="flex items-center flex-1">
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
//                     bookingStep >= step ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
//                   }`}>
//                     {step}
//                   </div>
//                   {step < 4 && (
//                     <div className={`flex-1 h-1 mx-2 transition-all ${
//                       bookingStep > step ? 'bg-amber-600' : 'bg-gray-200'
//                     }`} />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-between mt-2 text-xs font-medium text-gray-600">
//               <span>Service</span>
//               <span>Barber</span>
//               <span>Date & Time</span>
//               <span>Details</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           {error && (
//             <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
//               {error}
//             </div>
//           )}

//           {bookingStep === 1 && (
//             <div className="space-y-6">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Service</h2>
//                 <p className="text-gray-600">Select the service that suits you best</p>
//               </div>
//               {loading ? (
//                 <div className="text-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
//                   <p className="mt-4 text-gray-600">Loading services...</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {services.map((service) => (
//                     <ServiceCard key={service.id} service={service} onSelect={(s) => { setSelectedService(s); setBookingStep(2); }} />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {bookingStep === 2 && (
//             <div className="space-y-6">
//               <button onClick={() => setBookingStep(1)} className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium">
//                 ← Back to Services
//               </button>
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Barber</h2>
//                 <p className="text-gray-600">All our barbers are certified professionals</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {barbers.map((barber) => (
//                   <BarberCard key={barber.id} barber={barber} onSelect={(b) => { setSelectedBarber(b); setBookingStep(3); }} />
//                 ))}
//               </div>
//             </div>
//           )}

//           {bookingStep === 3 && (
//             <div className="space-y-6">
//               <button onClick={() => setBookingStep(2)} className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium">
//                 ← Back to Barbers
//               </button>
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Pick Your Time</h2>
//                 <p className="text-gray-600">Service: {selectedService?.name} | Barber: {selectedBarber?.name}</p>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     <Calendar className="w-4 h-4 inline mr-2" />
//                     Select Date
//                   </label>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     min={new Date().toISOString().split("T")[0]}
//                     className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none text-lg"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     <Clock className="w-4 h-4 inline mr-2" />
//                     Select Time
//                   </label>
//                   {selectedDate ? (
//                     availableSlots.length > 0 ? (
//                       <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto p-2">
//                         {availableSlots.map((slot) => (
//                           <button
//                             key={slot}
//                             onClick={() => setSelectedTime(slot)}
//                             className={`p-3 rounded-lg border-2 font-medium transition-all ${
//                               selectedTime === slot
//                                 ? "bg-amber-600 text-white border-amber-600 shadow-lg scale-105"
//                                 : "border-gray-300 hover:border-amber-600 hover:shadow-md"
//                             }`}
//                           >
//                             {slot}
//                           </button>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-center p-8 bg-gray-50 rounded-xl">No available slots for this date</p>
//                     )
//                   ) : (
//                     <p className="text-gray-500 text-center p-8 bg-gray-50 rounded-xl">Please select a date first</p>
//                   )}
//                 </div>
//               </div>

//               {selectedDate && selectedTime && (
//                 <button
//                   onClick={() => setBookingStep(4)}
//                   className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl text-lg"
//                 >
//                   Continue to Your Details →
//                 </button>
//               )}
//             </div>
//           )}

//           {bookingStep === 4 && (
//             <div className="space-y-6">
//               <button onClick={() => setBookingStep(3)} className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium">
//                 ← Back to Date & Time
//               </button>
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h2>
//                 <p className="text-gray-600">Just a few more details</p>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2">
//                   <form onSubmit={handleBookingSubmit} className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
//                       <input
//                         type="text"
//                         required
//                         value={customerInfo.name}
//                         onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                         className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
//                         placeholder="Enter your full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
//                       <input
//                         type="email"
//                         required
//                         value={customerInfo.email}
//                         onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
//                         className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
//                         placeholder="your.email@example.com"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
//                       <input
//                         type="tel"
//                         required
//                         value={customerInfo.phone}
//                         onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                         className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
//                         placeholder="0244123456"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method *</label>
//                       <div className="grid grid-cols-2 gap-4">
//                         <button
//                           type="button"
//                           onClick={() => setPaymentMethod("pay_at_shop")}
//                           className={`p-6 border-2 rounded-xl font-medium transition-all ${
//                             paymentMethod === "pay_at_shop"
//                               ? "bg-amber-600 text-white border-amber-600 shadow-lg"
//                               : "border-gray-300 hover:border-amber-600 hover:shadow-md"
//                           }`}
//                         >
//                           <DollarSign className="w-8 h-8 mx-auto mb-2" />
//                           Pay at Shop
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setPaymentMethod("online")}
//                           className={`p-6 border-2 rounded-xl font-medium transition-all ${
//                             paymentMethod === "online"
//                               ? "bg-amber-600 text-white border-amber-600 shadow-lg"
//                               : "border-gray-300 hover:border-amber-600 hover:shadow-md"
//                           }`}
//                         >
//                           <DollarSign className="w-8 h-8 mx-auto mb-2" />
//                           Pay Online
//                         </button>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-lg"
//                     >
//                       {loading ? "Processing..." : "Confirm Booking"}
//                     </button>
//                   </form>
//                 </div>

//                 <div>
//                   <BookingSummary
//                     service={selectedService}
//                     barber={selectedBarber}
//                     date={selectedDate}
//                     time={selectedTime}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {bookingStep === 5 && (
//             <div className="text-center space-y-8 py-12">
//               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
//                 <CheckCircle className="w-16 h-16 text-green-600" />
//               </div>
//               <h2 className="text-4xl font-bold text-gray-800">Booking Confirmed!</h2>
//               <p className="text-gray-600 max-w-md mx-auto text-lg">
//                 Your appointment has been successfully booked. We've sent a confirmation to {customerInfo.email}
//               </p>

//               <div className="max-w-md mx-auto">
//                 <BookingSummary
//                   service={selectedService}
//                   barber={selectedBarber}
//                   date={selectedDate}
//                   time={selectedTime}
//                 />
//               </div>

//               <div className="bg-amber-50 p-6 rounded-xl max-w-md mx-auto border-2 border-amber-200">
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Payment:</span>{" "}
//                   {paymentMethod === "online" ? "✓ Paid Online" : "Pay at Shop"}
//                 </p>
//               </div>

//               <button
//                 onClick={resetBooking}
//                 className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
//               >
//                 Book Another Appointment
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= MAIN APP =============
// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Route path="/" element={<BookingPage />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;




import { useState, useEffect, createContext, useContext } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  Plus,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { supabase } from "../libs/supabaseClient";
import { ServiceCard } from "./ServiceCard";
import { BarberCard } from "./BarberCard";
import { BookingSummary } from "./BookingSummary";
import { BookingTable } from "./BookingTable";
import { WalkInModal } from "./WalkInModal";

// ============= AUTH CONTEXT =============
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = () => {
    try {
      const adminSession = sessionStorage.getItem('hazard_kutz_admin');
      if (adminSession) {
        const admin = JSON.parse(adminSession);
        if (Date.now() - admin.loginTime < 24 * 60 * 60 * 1000) {
          setAdminUser(admin);
        } else {
          sessionStorage.removeItem('hazard_kutz_admin');
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    const session = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      loginTime: Date.now()
    };
    sessionStorage.setItem('hazard_kutz_admin', JSON.stringify(session));
    setAdminUser(session);
  };

  const logout = () => {
    sessionStorage.removeItem('hazard_kutz_admin');
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ adminUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// ============= PROTECTED ROUTE =============
export const ProtectedRoute = ({ element }) => {
  const { adminUser, loading } = useAuth();
  const navigate = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    if (!loading && !adminUser) {
      navigate('/admin/login');
    }
  }, [adminUser, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return adminUser ? element : null;
};



// ============= ADMIN LOGIN =============
export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = (path) => {
    window.location.href = path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', credentials.email)
        .eq('password', credentials.password)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      login(data);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Admin Portal</h2>
        <p className="text-gray-600 text-center mb-8">Sign in to manage bookings</p>

        {error && (
          <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
              placeholder="admin@hazardkutz.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none pr-10 transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// ============= ADMIN DASHBOARD =============
export const AdminDashboard = () => {
  const { adminUser, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminFilter, setAdminFilter] = useState("all");
  const [showWalkInModal, setShowWalkInModal] = useState(false);

  const navigate = (path) => {
    window.location.href = path;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [barbersRes, servicesRes, bookingsRes] = await Promise.all([
        supabase.from('barbers').select('*').eq('is_active', true).order('name'),
        supabase.from('services').select('*').eq('is_active', true).order('price'),
        supabase.from('bookings').select(`
          id, customer_name, customer_email, customer_phone, appointment_date,
          appointment_time, status, payment_method, payment_status, is_walk_in,
          barbers(name), services(name)
        `).order('appointment_date', { ascending: false }).order('appointment_time', { ascending: false })
      ]);

      if (barbersRes.data) {
        setBarbers(barbersRes.data.map(b => ({
          id: b.id,
          name: b.name,
          photoUrl: b.photo_url,
          specialties: b.specialties || []
        })));
      }

      if (servicesRes.data) {
        setServices(servicesRes.data.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          price: parseFloat(s.price),
          duration: s.duration
        })));
      }

      if (bookingsRes.data) {
        setBookings(bookingsRes.data.map(b => ({
          id: b.id,
          customerName: b.customer_name,
          customerEmail: b.customer_email,
          customerPhone: b.customer_phone,
          date: b.appointment_date,
          time: b.appointment_time,
          status: b.status,
          paymentMethod: b.payment_method,
          paymentStatus: b.payment_status,
          isWalkIn: b.is_walk_in,
          barberName: b.barbers?.name || 'Unknown',
          serviceName: b.services?.name || 'Unknown'
        })));
      }
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const bookingsSubscription = supabase
      .channel('bookings_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      bookingsSubscription.unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('id', bookingId);

      if (error) throw error;
      await loadData();
    } catch (err) {
      console.error('Cancel booking error:', err);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'completed', payment_status: 'paid', updated_at: new Date().toISOString() })
        .eq('id', bookingId);

      if (error) throw error;
      await loadData();
    } catch (err) {
      console.error('Complete booking error:', err);
      alert('Failed to complete booking. Please try again.');
    }
  };

  const handleAddWalkIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          barber_id: formData.get('barber_id'),
          service_id: formData.get('service_id'),
          customer_name: formData.get('customer_name'),
          customer_email: formData.get('customer_email') || 'walkin@hazardkutz.com',
          customer_phone: formData.get('customer_phone'),
          appointment_date: new Date().toISOString().split('T')[0],
          appointment_time: new Date().toTimeString().substring(0, 5),
          payment_method: 'pay_at_shop',
          status: 'confirmed',
          payment_status: 'unpaid',
          is_walk_in: true
        }]);

      if (error) throw error;

      setShowWalkInModal(false);
      await loadData();
    } catch (err) {
      console.error('Add walk-in error:', err);
      alert('Failed to add walk-in customer. Please try again.');
    }
  };

  const getFilteredBookings = () => {
    const today = new Date().toISOString().split("T")[0];

    switch (adminFilter) {
      case "today":
        return bookings.filter(b => b.date === today && b.status !== "cancelled");
      case "upcoming":
        return bookings.filter(b => b.date >= today && b.status !== "cancelled");
      case "cancelled":
        return bookings.filter(b => b.status === "cancelled");
      default:
        return bookings;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-400">HAZARD BARBERSHOP ADMIN</h1>
            <p className="text-gray-300">Welcome, {adminUser?.name}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Bookings Management</h2>
            <button
              onClick={() => setShowWalkInModal(true)}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Walk-In
            </button>
          </div>

          <div className="flex gap-2 border-b mb-6">
            {["all", "today", "upcoming", "cancelled"].map((filter) => (
              <button
                key={filter}
                onClick={() => setAdminFilter(filter)}
                className={`px-4 py-2 font-medium capitalize transition-colors ${
                  adminFilter === filter
                    ? "border-b-2 border-amber-600 text-amber-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : (
            <BookingTable
              bookings={getFilteredBookings()}
              onComplete={handleCompleteBooking}
              onCancel={handleCancelBooking}
            />
          )}

          <WalkInModal
            show={showWalkInModal}
            onClose={() => setShowWalkInModal(false)}
            services={services}
            barbers={barbers}
            onSubmit={handleAddWalkIn}
          />
        </div>
      </div>
    </div>
  );
};

// ============= CUSTOMER BOOKING PAGE =============
export const CustomerBookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("pay_at_shop");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const navigate = (path) => {
    window.location.href = path;
  };

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: barbersData, error: barbersError } = await supabase
        .from('barbers')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (barbersError) throw barbersError;

      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (servicesError) throw servicesError;

      const formattedBarbers = barbersData.map(barber => ({
        id: barber.id,
        name: barber.name,
        photoUrl: barber.photo_url,
        specialties: barber.specialties || [],
      }));

      const formattedServices = servicesData.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: parseFloat(service.price),
        duration: service.duration,
      }));

      setBarbers(formattedBarbers);
      setServices(formattedServices);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const generateTimeSlots = async (date, barberId) => {
    const slots = [];
    const startHour = 9;
    const endHour = 19;

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    try {
      const { data: bookedSlots, error: bookingsError } = await supabase
        .from('bookings')
        .select('appointment_time')
        .eq('barber_id', barberId)
        .eq('appointment_date', date)
        .neq('status', 'cancelled');

      if (bookingsError) throw bookingsError;

      const { data: blockedSlots, error: blockedError } = await supabase
        .from('blocked_slots')
        .select('start_time, end_time')
        .eq('barber_id', barberId)
        .eq('date', date);

      if (blockedError) throw blockedError;

      const unavailableTimes = new Set();

      bookedSlots?.forEach(booking => {
        unavailableTimes.add(booking.appointment_time.substring(0, 5));
      });

      blockedSlots?.forEach(blocked => {
        const start = blocked.start_time.substring(0, 5);
        const end = blocked.end_time.substring(0, 5);
        
        slots.forEach(slot => {
          if (slot >= start && slot < end) {
            unavailableTimes.add(slot);
          }
        });
      });

      return slots.filter(slot => !unavailableTimes.has(slot));
    } catch (err) {
      console.error('Error generating time slots:', err);
      return slots;
    }
  };

  useEffect(() => {
    const loadSlots = async () => {
      if (selectedDate && selectedBarber) {
        const slots = await generateTimeSlots(selectedDate, selectedBarber.id);
        setAvailableSlots(slots);
      }
    };
    loadSlots();
  }, [selectedDate, selectedBarber]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === "online") {
      // Payment will be handled by Paystack button
      return;
    }

    await submitBooking(null);
  };

  const submitBooking = async (paymentReference) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          barber_id: selectedBarber.id,
          service_id: selectedService.id,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          payment_method: paymentMethod,
          payment_reference: paymentReference,
          status: 'confirmed',
          payment_status: paymentMethod === 'online' ? 'paid' : 'unpaid',
          is_walk_in: false
        }])
        .select();

      if (error) throw error;

      setBookingStep(5);
    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to create booking. Please try again.');
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate("");
    setSelectedTime("");
    setCustomerInfo({ name: "", email: "", phone: "" });
    setPaymentMethod("pay_at_shop");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold text-amber-400 mb-2">Hazard Kutz</h1>
              <p className="text-xl text-gray-300">Where Style Meets Precision</p>
            </div>
            <button
              onClick={() => navigate('/admin/login')}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm border border-white/20"
            >
              Admin Login
            </button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+233 24 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>book@hazardkutz.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Accra, Ghana</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {bookingStep < 5 && (
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-2 py-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4,5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    bookingStep >= step ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      bookingStep > step ? 'bg-amber-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt- text-xs font-medium text-gray-600">
              <span>Service</span>
              <span>Barber</span>
              <span>Date & Time</span>
              <span>Details</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {bookingStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Service</h2>
                <p className="text-gray-600">Select the service that suits you best</p>
              </div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading services...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} onSelect={(s) => { setSelectedService(s); setBookingStep(2); }} />
                  ))}
                </div>
              )}
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-6">
              <button onClick={() => setBookingStep(1)} className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium">
                ← Back to Services
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Barber</h2>
                <p className="text-gray-600">All our barbers are certified professionals</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {barbers.map((barber) => (
                  <BarberCard key={barber.id} barber={barber} onSelect={(b) => { setSelectedBarber(b); setBookingStep(3); }} />
                ))}
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="space-y-6">
              <button onClick={() => setBookingStep(2)} className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium">
                ← Back to Barbers
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Pick Your Time</h2>
                <p className="text-gray-600">Service: {selectedService?.name} | Barber: {selectedBarber?.name}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time
                  </label>
                  {selectedDate ? (
                    availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto p-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-3 rounded-lg border-2 font-medium transition-all ${
                              selectedTime === slot
                                ? "bg-amber-600 text-white border-amber-600 shadow-lg scale-105"
                                : "border-gray-300 hover:border-amber-600 hover:shadow-md"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center p-8 bg-gray-50 rounded-xl">No available slots for this date</p>
                    )
                  ) : (
                    <p className="text-gray-500 text-center p-8 bg-gray-50 rounded-xl">Please select a date first</p>
                  )}
                </div>
              </div>

              {selectedDate && selectedTime && (
                <button
                  onClick={() => setBookingStep(4)}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Continue to Your Details →
                </button>
              )}
            </div>
          )}

          {bookingStep === 4 && (
            <div className="space-y-6">
              <button onClick={() => setBookingStep(3)} className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium">
                ← Back to Date & Time
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h2>
                <p className="text-gray-600">Just a few more details</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                        placeholder="0244123456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method *</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("pay_at_shop")}
                          className={`p-6 border-2 rounded-xl font-medium transition-all ${
                            paymentMethod === "pay_at_shop"
                              ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                              : "border-gray-300 hover:border-amber-600 hover:shadow-md"
                          }`}
                        >
                          <DollarSign className="w-8 h-8 mx-auto mb-2" />
                          Pay at Shop
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("online")}
                          className={`p-6 border-2 rounded-xl font-medium transition-all ${
                            paymentMethod === "online"
                              ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                              : "border-gray-300 hover:border-amber-600 hover:shadow-md"
                          }`}
                        >
                          <DollarSign className="w-8 h-8 mx-auto mb-2" />
                          Pay Online
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-lg"
                    >
                      {loading ? "Processing..." : "Confirm Booking"}
                    </button>
                  </form>
                </div>

                <div>
                  <BookingSummary
                    service={selectedService}
                    barber={selectedBarber}
                    date={selectedDate}
                    time={selectedTime}
                  />
                </div>
              </div>
            </div>
          )}

          {bookingStep === 5 && (
            <div className="text-center space-y-8 py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800">Booking Confirmed!</h2>
              <p className="text-gray-600 max-w-md mx-auto text-lg">
                Your appointment has been successfully booked. We've sent a confirmation to {customerInfo.email}
              </p>

              <div className="max-w-md mx-auto">
                <BookingSummary
                  service={selectedService}
                  barber={selectedBarber}
                  date={selectedDate}
                  time={selectedTime}
                />
              </div>

              <div className="bg-amber-50 p-6 rounded-xl max-w-md mx-auto border-2 border-amber-200">
                <p className="text-gray-700">
                  <span className="font-semibold">Payment:</span>{" "}
                  {paymentMethod === "online" ? "✓ Paid Online" : "Pay at Shop"}
                </p>
              </div>

              <button
                onClick={resetBooking}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
              >
                Book Another Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Default export for backward compatibility
const HazardKutzBookingSystem = CustomerBookingPage;
export default HazardKutzBookingSystem;