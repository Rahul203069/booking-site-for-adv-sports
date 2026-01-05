import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface SimpleCalendarProps {
  value: string;
  onChange: (date: string) => void;
  onClose: () => void;
  minDate?: string;
}

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({ value, onChange, onClose, minDate = new Date().toISOString().split('T')[0] }) => {
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());

  // Prevent view date from going to invalid state if value is empty
  useEffect(() => {
    if (value && !isNaN(new Date(value).getTime())) {
      setViewDate(new Date(value));
    }
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    // Adjust for timezone offset to ensure string is correct YYYY-MM-DD
    const offset = selectedDate.getTimezoneOffset();
    const adjustedDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
    onChange(adjustedDate.toISOString().split('T')[0]);
    onClose();
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [];
  // Empty slots for start of month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-9 h-9"></div>);
  }

  // Days
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDateStr = new Date(year, month, i).toISOString().split('T')[0];
    const isSelected = value === currentDateStr;
    const isPast = currentDateStr < minDate;
    
    // Check if today
    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = currentDateStr === todayStr;

    days.push(
      <button
        key={i}
        onClick={(e) => {
            e.stopPropagation();
            if(!isPast) handleDateClick(i);
        }}
        disabled={isPast}
        className={`
            w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
            ${isSelected 
                ? 'bg-primary-600 text-white shadow-md' 
                : isPast 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-900 hover:bg-gray-100 hover:text-black'
            }
            ${!isSelected && isToday ? 'ring-1 ring-primary-500 text-primary-600 font-bold' : ''}
        `}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="w-[320px] bg-white" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4 px-1">
        <button 
            onClick={handlePrevMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <span className="text-base font-bold text-gray-900">
          {monthNames[month]} {year}
        </span>
        <button 
            onClick={handleNextMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 justify-items-center">
        {days}
      </div>
    </div>
  );
};

export default SimpleCalendar;