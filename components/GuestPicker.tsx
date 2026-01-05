import React from 'react';
import { MinusIcon, PlusIcon } from './Icons';

interface GuestPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  onClose?: () => void;
}

const GuestPicker: React.FC<GuestPickerProps> = ({ value, onChange, min = 1, max = 20 }) => {
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value > min) onChange(value - 1);
  };

  return (
    <div className="w-[340px] p-6" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-base">Guests</span>
          <span className="text-gray-500 text-sm font-normal">Ages 13 or above</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            disabled={value <= min}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              value <= min 
                ? 'border-gray-200 text-gray-200 cursor-not-allowed' 
                : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900'
            }`}
            type="button"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          
          <span className="w-8 text-center font-medium text-gray-900 text-base tabular-nums">
            {value}
          </span>
          
          <button
            onClick={handleIncrement}
            disabled={value >= max}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              value >= max 
                ? 'border-gray-200 text-gray-200 cursor-not-allowed' 
                : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900'
            }`}
            type="button"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
         <p className="text-xs text-gray-500">
            Maximum {max} guests allowed for most adventures.
         </p>
      </div>
    </div>
  );
};

export default GuestPicker;