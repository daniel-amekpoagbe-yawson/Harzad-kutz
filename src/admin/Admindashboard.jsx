import { useEffect, useState,useRouter, } from "react";
import { supabase } from "../libs/supabaseClient";
import { LogOut, Plus } from "lucide-react";
import { BookingTable } from "../Bookings/BookingTable";
import { WalkInModal } from "../Bookings/WalkInModal";
import { useAuth } from "../hooks/useAuth";

// ============= ADMIN DASHBOARD =============
export const AdminDashboard = () => {
  const { adminUser, logout } = useAuth();
  const { navigate } = useRouter();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminFilter, setAdminFilter] = useState("all");
  const [showWalkInModal, setShowWalkInModal] = useState(false);

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
            <h1 className="text-3xl font-bold text-amber-400">Hazard Kutz Admin</h1>
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