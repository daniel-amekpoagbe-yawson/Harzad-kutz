
// export const BookingSummary = ({ service, barber, date, time }) => (
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




export const BookingSummary = ({ service, barber, date, time }) => (
  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
    <h3 className="font-bold text-gray-800 mb-4 text-lg">Booking Summary</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Service:</span>
        <span className="font-semibold text-gray-800">{service?.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Barber:</span>
        <span className="font-semibold text-gray-800">{barber?.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Date:</span>
        <span className="font-semibold text-gray-800">{date}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Time:</span>
        <span className="font-semibold text-gray-800">{time}</span>
      </div>
      <div className="border-t-2 border-amber-300 pt-3 mt-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-amber-600">GH₵{service?.price}</span>
        </div>
      </div>
    </div>
  </div>
);
