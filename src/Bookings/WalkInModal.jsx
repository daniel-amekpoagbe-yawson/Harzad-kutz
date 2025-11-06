import { X } from "lucide-react";


export const WalkInModal = ({ show, onClose, services, barbers, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Add Walk-In Customer</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name *</label>
              <input
                type="text"
                name="customer_name"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="customer_phone"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                placeholder="0244123456"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
              <input
                type="email"
                name="customer_email"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service *</label>
              <select
                name="service_id"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - GH₵{service.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Barber *</label>
              <select
                name="barber_id"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
              >
                <option value="">Select a barber</option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-colors"
              >
                Add Walk-In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};