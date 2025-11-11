import { useState, useEffect, createContext, useContext } from "react";
import {
  Calendar,
  Clock,
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
import Spinner from "../Components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { confirmToast } from "../Components/Confirmtoast";
import { sendBookingEmail } from "../services/sendEmail";

// ============= AUTH CONTEXT =============
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session) {
        setAdminUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email,
        });
      }
    } catch (error) {
      console.error("Session check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      setAdminUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || data.user.email,
      });
    }

    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
  if (!context) throw new Error("useAuth must be used within AuthProvider");
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
      navigate("/admin/login");
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
      // Authenticate with Supabase Auth
      await login(credentials.email.trim(), credentials.password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
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

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Admin Portal
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Sign in to manage bookings
        </p>

        {error && (
          <div className="bg-red-50 border-1 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
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
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full p-3 border-1 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
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
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full p-3 border-1 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none pr-10 transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
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

        <div className="mt-6 text-center bellefair">
          <button
            onClick={() => navigate("/")}
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
        supabase
          .from("barbers")
          .select("*")
          .eq("is_active", true)
          .order("name"),
        supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("price"),
        supabase
          .from("bookings")
          .select(
            `
          id, customer_name, customer_email, customer_phone, appointment_date,
          appointment_time, status, payment_method, payment_status, is_walk_in,
          barbers(name), services(name)
        `
          )
          .order("appointment_date", { ascending: false })
          .order("appointment_time", { ascending: false }),
      ]);

      if (barbersRes.data) {
        setBarbers(
          barbersRes.data.map((b) => ({
            id: b.id,
            name: b.name,
            photoUrl: b.photo_url,
            specialties: b.specialties || [],
          }))
        );
      }

      if (servicesRes.data) {
        setServices(
          servicesRes.data.map((s) => ({
            id: s.id,
            name: s.name,
            description: s.description,
            price: parseFloat(s.price),
            duration: s.duration,
          }))
        );
      }

      if (bookingsRes.data) {
        setBookings(
          bookingsRes.data.map((b) => ({
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
            barberName: b.barbers?.name || "Unknown",
            serviceName: b.services?.name || "Unknown",
          }))
        );
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const bookingsSubscription = supabase
      .channel("bookings_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      bookingsSubscription.unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  // Confirm before cancelling booking
  const handleCancelBooking = (bookingId) => {
    confirmToast("Are you sure you want to cancel this booking?", async () => {
      try {
        const { error } = await supabase
          .from("bookings")
          .update({
            status: "cancelled",
            updated_at: new Date().toISOString(),
          })
          .eq("id", bookingId);

        if (error) throw error;

        toast.success("Booking cancelled successfully");
        await loadData();
      } catch (err) {
        console.error("Cancel booking error:", err);
        toast.error("Failed to cancel booking. Please try again.");
      }
    });
  };

  // Complete booking
  const handleCompleteBooking = async (bookingId) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "completed",
          payment_status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId);

      if (error) throw error;
      await loadData();
    } catch (err) {
      console.error("Complete booking error:", err);
      toast.error("Failed to complete booking. Please try again.");
    }
  };

  const handleAddWalkIn = async (formData) => {
    try {
      const { error } = await supabase.from("bookings").insert([
        {
          barber_id: formData.barber_id,
          service_id: formData.service_id,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email || "walkin@hazardkutz.com",
          customer_phone: formData.customer_phone,
          appointment_date: new Date().toISOString().split("T")[0],
          appointment_time: new Date().toTimeString().substring(0, 5),
          payment_method: "pay_at_shop",
          status: "confirmed",
          payment_status: "unpaid",
          is_walk_in: true,
        },
      ]);

      if (error) throw error;

      setShowWalkInModal(false);
      await loadData();

      return true; // signal success
    } catch (err) {
      console.error("Add walk-in error:", err);
      toast.error("Failed to add walk-in customer. Please try again.");
      return false;
    }
  };

  const getFilteredBookings = () => {
    const today = new Date().toISOString().split("T")[0];

    switch (adminFilter) {
      case "today":
        return bookings.filter(
          (b) => b.date === today && b.status !== "cancelled"
        );
      case "upcoming":
        return bookings.filter(
          (b) => b.date >= today && b.status !== "cancelled"
        );
      case "cancelled":
        return bookings.filter((b) => b.status === "cancelled");
      default:
        return bookings;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-amber-400 cinzel">
              ADMIN DASHBOARD
            </h3>
            <p className="text-gray-300 bellefair">
              Welcome, {adminUser?.name}
            </p>
          </div>
          <div className="flex gap-3 bellefair">
            <button
              onClick={() => navigate("/bookingpage")}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 cinzel">
              Bookings Management
            </h2>
            <button
              onClick={() => setShowWalkInModal(true)}
              className="bg-amber-600 text-white px-4 py-2 bellefair rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Walk-In
            </button>
          </div>

          <div className="flex gap-2 border-b border-b-gray-400/40 mb-6 bellefair font-semibold text-lg">
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
            <div className="text-center py-20">
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
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("pay_at_shop");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: barbersData, error: barbersError } = await supabase
        .from("barbers")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (barbersError) throw barbersError;

      const { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("price");

      if (servicesError) throw servicesError;

      const formattedBarbers = barbersData.map((barber) => ({
        id: barber.id,
        name: barber.name,
        photoUrl: barber.photo_url,
        specialties: barber.specialties || [],
      }));

      const formattedServices = servicesData.map((service) => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: parseFloat(service.price),
        duration: service.duration,
      }));

      setBarbers(formattedBarbers);
      setServices(formattedServices);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data. Please refresh the page.");
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
        .from("bookings")
        .select("appointment_time")
        .eq("barber_id", barberId)
        .eq("appointment_date", date)
        .neq("status", "cancelled");

      if (bookingsError) throw bookingsError;

      const { data: blockedSlots, error: blockedError } = await supabase
        .from("blocked_slots")
        .select("start_time, end_time")
        .eq("barber_id", barberId)
        .eq("date", date);

      if (blockedError) throw blockedError;

      const unavailableTimes = new Set();

      bookedSlots?.forEach((booking) => {
        unavailableTimes.add(booking.appointment_time.substring(0, 5));
      });

      blockedSlots?.forEach((blocked) => {
        const start = blocked.start_time.substring(0, 5);
        const end = blocked.end_time.substring(0, 5);

        slots.forEach((slot) => {
          if (slot >= start && slot < end) {
            unavailableTimes.add(slot);
          }
        });
      });

      return slots.filter((slot) => !unavailableTimes.has(slot));
    } catch (err) {
      console.error("Error generating time slots:", err);
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

  // Handle Paystack Inline Payment
  const handlePaystackPayment = () => {
    // Validate form fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      toast.error("Payment system not loaded. Please refresh the page.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Paystack public key
      email: customerInfo.email,
      amount: selectedService.price * 100, // Amount in pesewas (GHS)
      currency: "GHS",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // Generate random reference
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerInfo.name,
          },
          {
            display_name: "Service",
            variable_name: "service",
            value: selectedService.name,
          },
          {
            display_name: "Barber",
            variable_name: "barber",
            value: selectedBarber.name,
          },
          {
            display_name: "Appointment Date",
            variable_name: "appointment_date",
            value: selectedDate,
          },
          {
            display_name: "Appointment Time",
            variable_name: "appointment_time",
            value: selectedTime,
          },
        ],
      },
      onClose: function () {
        toast.error("Payment cancelled. Please try again.");
      },
      callback: function (response) {
        handlePaystackSuccess(response);
      },
    });

    handler.openIframe();
  };

  // Handle successful Paystack payment
  const handlePaystackSuccess = async (response) => {
    console.log("Payment successful:", response);

    toast.success("Payment successful! Creating your booking...");

    // Submit booking with payment reference
    await submitBooking(response.reference);
  };

  const handleBookingSubmit = async () => {
    // Validate form fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "online") {
      // This should never happen now, but just in case
      toast.error("Please use the Pay with Paystack button");
      return;
    }

    await submitBooking(null);
  };

  const submitBooking = async (paymentReference) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("bookings")
        .insert([
          {
            barber_id: selectedBarber.id,
            service_id: selectedService.id,
            customer_name: customerInfo.name,
            customer_email: customerInfo.email,
            customer_phone: customerInfo.phone,
            appointment_date: selectedDate,
            appointment_time: selectedTime,
            payment_method: paymentMethod,
            payment_reference: paymentReference,
            status: "confirmed",
            payment_status: paymentMethod === "online" ? "paid" : "unpaid",
            is_walk_in: false,
          },
        ])
        .select();

      if (error) throw error;

      // ✅ NEW: Send confirmation email with React Email
      try {
        await sendBookingEmail({
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          barberName: selectedBarber.name,
          serviceName: selectedService.name,
          appointmentDate: new Date(selectedDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          appointmentTime: selectedTime,
          paymentMethod: paymentMethod,
          paymentReference: paymentReference,
          paymentStatus: paymentMethod === "online" ? "Paid" : "Pay at venue",
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the booking if email fails
      }

      setBookingStep(5);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to create booking. Please try again.");
      alert("Failed to create booking. Please try again.");
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
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-lg sm:text-3xl font-bold cinzel text-amber-400 mb-2">
                HAZARDKUTZ BOOKING
              </h2>
              <p className="text-base sm:text-xl bellefair text-gray-300">
                Where Style Meets Precision
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm bellefair">
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-4 bellefair">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 border-1 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {bookingStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Choose Your Service
                </h2>
                <p className="text-gray-600">
                  Your fresh look starts here — whether you’re in for a quick
                  shape-up or a full transformation, we’ve got you covered.
                </p>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onSelect={(s) => {
                        setSelectedService(s);
                        setBookingStep(2);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-2">
              <button
                onClick={() => setBookingStep(1)}
                className="text-amber-500 hover:text-amber-600 flex items-center gap-2 mb-4 font-medium"
              >
                ← Back to Services
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Select Your Barber
                </h2>
                <p className="text-gray-600">
                  All our barbers are certified professionals
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {barbers.map((barber) => (
                  <BarberCard
                    key={barber.id}
                    barber={barber}
                    onSelect={(b) => {
                      setSelectedBarber(b);
                      setBookingStep(3);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="space-y-6">
              <button
                onClick={() => setBookingStep(2)}
                className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium"
              >
                ← Back to Barbers
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Pick Your Time
                </h2>
                <p className="text-gray-600">
                  Service: {selectedService?.name} | Barber:{" "}
                  {selectedBarber?.name}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <DatePicker
                    selected={selectedDate ? new Date(selectedDate) : null}
                    onChange={(date) =>
                      setSelectedDate(date.toISOString().split("T")[0])
                    }
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none text-lg"
                    placeholderText="Select a date"
                  />
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-amber-700 font-semibold mb-3 text-sm sm:text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Select Time
                  </h3>

                  {selectedDate ? (
                    availableSlots.length > 0 ? (
                      <div className="w-full max-w-md mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-h-64 overflow-y-auto p-1 sm:p-2 bg-white rounded-xl shadow-inner">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`h-10 sm:h-11 flex items-center justify-center rounded-lg border text-sm sm:text-base font-medium transition-all duration-200 ${
                                selectedTime === slot
                                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-lg scale-105"
                                  : "border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-700 hover:shadow-sm"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center p-8 bg-gray-50 rounded-xl">
                        No available slots for this date
                      </p>
                    )
                  ) : (
                    <p className="text-gray-500 text-center p-8 bg-gray-50 rounded-xl">
                      Please select a date first
                    </p>
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
              <button
                onClick={() => setBookingStep(3)}
                className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mb-4 font-medium"
              >
                ← Back to Date & Time
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Complete Your Booking
                </h2>
                <p className="text-gray-600">Just a few more details</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-4 border-1 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-4 border-1 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-4 border-1 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                        placeholder="0244123456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Payment Method *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("pay_at_shop")}
                          className={`p-4 border-1 rounded-xl font-bold transition-all ${
                            paymentMethod === "pay_at_shop"
                              ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                              : "border-gray-300 hover:border-amber-600 hover:shadow-md"
                          }`}
                        >
                          Pay at Shop
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("online")}
                          className={`p-4 border-1 rounded-xl font-bold transition-all ${
                            paymentMethod === "online"
                              ? "bg-amber-600 text-white border-amber-600 shadow-lg"
                              : "border-gray-300 hover:border-amber-600 hover:shadow-md"
                          }`}
                        >
                          Pay Online
                        </button>
                      </div>
                    </div>

                    {/* Pay at Shop Button */}
                    {paymentMethod === "pay_at_shop" && (
                      <button
                        type="button"
                        onClick={handleBookingSubmit}
                        disabled={
                          loading ||
                          !customerInfo.name ||
                          !customerInfo.email ||
                          !customerInfo.phone
                        }
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-lg"
                      >
                        {loading ? "Processing..." : "Confirm Booking"}
                      </button>
                    )}

                    {/* Pay Online Button */}
                    {paymentMethod === "online" && (
                      <button
                        type="button"
                        onClick={handlePaystackPayment}
                        disabled={
                          loading ||
                          !customerInfo.name ||
                          !customerInfo.email ||
                          !customerInfo.phone
                        }
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-lg"
                      >
                        {loading ? "Processing..." : "Pay with Paystack"}
                      </button>
                    )}
                  </div>
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
              <h2 className="text-4xl font-bold text-gray-800">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 max-w-md mx-auto text-lg">
                Your appointment has been successfully booked. We've sent a
                confirmation to {customerInfo.email}
              </p>

              <div className="max-w-md mx-auto">
                <BookingSummary
                  service={selectedService}
                  barber={selectedBarber}
                  date={selectedDate}
                  time={selectedTime}
                />
              </div>

              <div className="bg-amber-50 p-6 rounded-xl max-w-md mx-auto border-1 border-amber-200">
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
