import { Clock, Scissors } from "lucide-react";

export const ServiceCard = ({ service, onSelect }) => (
  <div className="bg-white border-1 border-gray-200 rounded-xl p-4 hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer group"
    onClick={() => onSelect(service)}>
    <div className="flex items-start justify-between mb-2">
      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
        <Scissors className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
      </div>
      <span className="text-2xl font-bold text-amber-600">GH₵{service.price}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
    <p className="text-gray-600 mb-2">{service.description}</p>
    <div className="flex items-center text-sm text-gray-500">
      <Clock className="w-4 h-4 mr-1" />
      {service.duration} minutes
    </div>
  </div>
);