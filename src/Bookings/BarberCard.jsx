

import { Star } from "lucide-react";

export const BarberCard = ({ barber, onSelect }) => (
  <div className="bg-white border-1 border-gray-200 rounded-xl overflow-hidden hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer group"
    onClick={() => onSelect(barber)}>
    <div className="aspect-square overflow-hidden bg-gray-200">
      <img src={barber.photoUrl || 'https://via.placeholder.com/400'} alt={barber.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{barber.name}</h3>
      <div className="flex flex-wrap gap-1">
        {barber.specialties?.map((specialty, idx) => (
          <span key={idx} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
            {specialty}
          </span>
        ))}
      </div>
      <div className="flex items-center mt-3 text-amber-600">
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <span className="ml-2 text-sm text-gray-600">5.0</span>
      </div>
    </div>
  </div>
);