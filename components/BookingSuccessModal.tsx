"use client" // Essential for modals that use interactivity
import React from 'react';
// FIX 1: Use next/link instead of react-router-dom
import Link from 'next/link';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityTitle: string;
  activityImage: string;
  date: string;
  guests: number;
  totalPrice: number;
}

const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  onClose,
  activityTitle,
  activityImage,
  date,
  guests,
  totalPrice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-in zoom-in-95 fade-in duration-300">
        
        {/* Confetti/Success Header */}
        <div className="pt-10 pb-6 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50/50">
             <svg 
               className="w-10 h-10 text-green-500 animate-bounce-short" 
               fill="none" 
               stroke="currentColor" 
               viewBox="0 0 24 24"
             >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
             </svg>
          </div>
          
          <h2 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 px-8">
            You&apos;re all set for your adventure. Check your email for the tickets and receipt.
          </p>
        </div>
        
        {/* Booking Summary Card */}
        <div className="px-8 mb-8">
          <div className="bg-gray-50 rounded-2xl p-4 flex gap-4 border border-gray-100 shadow-sm">
            <img 
              src={activityImage} 
              alt={activityTitle} 
              className="w-20 h-20 rounded-xl object-cover shadow-sm ring-1 ring-black/5" 
            />
            <div className="flex flex-col justify-center min-w-0">
              <h3 className="font-bold text-gray-900 truncate mb-1">{activityTitle}</h3>
              <p className="text-xs font-medium text-gray-600 mb-1">
                {date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Date not selected'} 
                {' '}• {guests} guest{guests > 1 ? 's' : ''}
              </p>
              <p className="text-sm font-black text-primary-600">Total Paid: ${totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 pb-10 space-y-3">
          {/* FIX 2: Change 'to' to 'href' and style the button */}
          <Link 
            href="/dashboard" 
            className="flex items-center justify-center w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-xl hover:shadow-gray-200 active:scale-[0.98]"
          >
            View My Trips
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-50 hover:border-gray-900 transition-all active:scale-[0.98]"
          >
            Continue Browsing
          </Link>
        </div>

        {/* Close Icon (Optional top-right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BookingSuccessModal;