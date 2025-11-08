import { CheckCircle, X } from "lucide-react";

export const BookingTable = ({ bookings, onComplete, onCancel }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 cinzel">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
            Customer
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
            Service
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
            Barber
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
            Date & Time
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
            Status
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
            Payment
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 nunito">
        {bookings.length === 0 ? (
          <tr>
            <td
              colSpan="7"
              className="px-4 py-8 text-center text-gray-500 bellefair"
            >
              No bookings found
            </td>
          </tr>
        ) : (
          bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-800">
                  {booking.customerName}
                </div>
                <div className="text-xs text-gray-500">
                  {booking.customerPhone}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {booking.serviceName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {booking.barberName}
              </td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-800">{booking.date}</div>
                <div className="text-xs text-gray-500">{booking.time}</div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : booking.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
                {booking.isWalkIn && (
                  <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                    Walk-in
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-6">
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => onComplete(booking.id)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  {booking.status !== "cancelled" &&
                    booking.status !== "completed" && (
                      <button
                        onClick={() => onCancel(booking.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
