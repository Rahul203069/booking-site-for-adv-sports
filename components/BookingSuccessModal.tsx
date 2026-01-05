import React from 'react';
import { Link } from 'react-router-dom';

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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100 opacity-100">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
             <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-8">You're all set for your adventure. A confirmation email has been sent.</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left flex gap-4 border border-gray-100 shadow-sm">
            <img src={activityImage} alt={activityTitle} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{activityTitle}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Date not selected'} 
                {' '}• {guests} guest{guests > 1 ? 's' : ''}
              </p>
              <p className="text-sm font-bold text-primary-700">Total: ${totalPrice}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link 
              to="/dashboard" 
              className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-600/40 transform hover:-translate-y-0.5"
            >
              View My Trips
            </Link>
            <Link
              to="/"
              className="block w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;