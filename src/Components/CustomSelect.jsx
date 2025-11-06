// components/CustomSelect.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-amber-600">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center px-4 py-3 border-1 rounded-lg text-sm transition-all duration-200
          ${
            open
              ? "border-amber-500 bg-gray-50"
              : "border-gray-300 bg-white hover:border-amber-500"
          } text-gray-800`}
      >
        <span>{value ? value.label : placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180 text-amber-500" : "text-gray-400"
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-gray-200 border border-gray-100 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto animate-fadeIn">
          {options.length > 0 ? (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700  hover:text-amber-600 transition-colors"
              >
                {option.label}
              </button>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-400 text-sm">No options available</p>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
