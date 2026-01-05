import React, { useState } from 'react';
import { Activity } from '../types';
import { ChevronLeftIcon, StarIcon, ShieldCheckIcon, CreditCardIcon, CloseIcon } from './Icons';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  activity: Activity;
  date: string;
  guests: number;
  totalPrice: number;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  activity,
  date,
  guests,
  totalPrice
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiration: '',
    cvv: '',
    zip: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    onConfirm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    // Simple formatter for Card Number to add spaces
    if(e.target.name === 'cardNumber') {
        value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-6xl md:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Close Button (Desktop) */}
        <button 
            onClick={onClose} 
            className="hidden md:flex absolute top-6 left-6 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
            <CloseIcon className="w-5 h-5 text-gray-800" />
        </button>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 border-b border-gray-100 shrink-0 bg-white z-10 sticky top-0">
           <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
             <ChevronLeftIcon className="w-5 h-5" />
           </button>
           <span className="font-bold text-lg flex-1 text-center pr-8">Request to book</span>
        </div>

        {/* LEFT COLUMN: Input Form */}
        <div className="order-2 md:order-1 flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-12 md:pt-20 max-w-2xl mx-auto">
                
                <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-10">Request to book</h2>

                {/* Section: Your Trip */}
                <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-6">Your trip</h3>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <div className="font-semibold text-gray-900">Dates</div>
                            <div className="text-gray-600">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                        <button className="font-semibold underline text-gray-900 hover:text-gray-600">Edit</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-semibold text-gray-900">Guests</div>
                            <div className="text-gray-600">{guests} guest{guests > 1 ? 's' : ''}</div>
                        </div>
                        <button className="font-semibold underline text-gray-900 hover:text-gray-600">Edit</button>
                    </div>
                </div>

                <hr className="border-gray-200 mb-10" />

                {/* Section: Payment */}
                <form onSubmit={handleConfirm}>
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Pay with</h3>
                            <div className="flex gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-5" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="Amex" />
                            </div>
                        </div>

                        {/* Payment Method Toggle */}
                        <div className="flex gap-4 mb-6">
                            <button 
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-medium transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <CreditCardIcon className="w-5 h-5" />
                                Card
                            </button>
                            <button 
                                type="button"
                                onClick={() => setPaymentMethod('paypal')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-medium transition-all ${paymentMethod === 'paypal' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <span className="italic font-serif font-bold text-blue-800">Pay</span><span className="italic font-serif font-bold text-blue-500">Pal</span>
                            </button>
                        </div>

                        {/* Card Inputs - Grouped Style */}
                        {paymentMethod === 'card' && (
                            <div className="space-y-0">
                                <div className="relative group z-10">
                                    <input 
                                        type="text" 
                                        name="cardNumber"
                                        id="cardNumber"
                                        placeholder=" "
                                        className="block w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 rounded-t-xl focus:border-black focus:ring-1 focus:ring-black focus:z-10 outline-none peer appearance-none"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        maxLength={19}
                                        required
                                    />
                                    <label htmlFor="cardNumber" className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Card number</label>
                                    <CreditCardIcon className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex -mt-px relative z-0">
                                    <div className="relative flex-1">
                                        <input 
                                            type="text" 
                                            name="expiration"
                                            id="expiration"
                                            placeholder=" "
                                            className="block w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:z-10 outline-none peer rounded-bl-xl appearance-none"
                                            value={formData.expiration}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label htmlFor="expiration" className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Expiration</label>
                                    </div>
                                    <div className="relative flex-1 -ml-px">
                                        <input 
                                            type="text" 
                                            name="cvv"
                                            id="cvv"
                                            placeholder=" "
                                            className="block w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:z-10 outline-none peer rounded-br-xl appearance-none"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            maxLength={4}
                                            required
                                        />
                                        <label htmlFor="cvv" className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">CVV</label>
                                    </div>
                                </div>
                                <div className="relative mt-4">
                                    <input 
                                        type="text" 
                                        name="zip"
                                        id="zip"
                                        placeholder=" "
                                        className="block w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-black focus:ring-1 focus:ring-black focus:z-10 outline-none peer appearance-none"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor="zip" className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Zip code</label>
                                </div>
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-200 mb-10" />

                    {/* Section: Message */}
                    <div className="mb-10">
                        <h3 className="text-xl font-semibold mb-2">Message the host</h3>
                        <p className="text-gray-500 text-sm mb-4">Share a little about yourself and why you're coming.</p>
                        <textarea 
                            name="message"
                            className="w-full bg-white text-gray-900 border border-gray-400 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none text-base transition-colors hover:border-black"
                            placeholder="Hi! I'm traveling with my family..."
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                    </div>

                    <hr className="border-gray-200 mb-10" />

                    {/* Cancellation & Button */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Cancellation policy</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            <span className="font-bold text-gray-800">Free cancellation for 48 hours.</span> After that, cancel before the check-in date for a partial refund.
                        </p>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#FF385C] to-[#E61E4D] hover:from-[#E31C5F] hover:to-[#D41C52] text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                            "Confirm and pay"
                        )}
                    </button>
                    <p className="text-center mt-4 text-xs text-gray-500">You won't be charged yet</p>
                </form>
            </div>
        </div>

        {/* RIGHT COLUMN: Price Summary (Sticky Card) */}
        <div className="order-1 md:order-2 w-full md:w-[42%] bg-gray-50 md:bg-white p-6 md:p-12 md:border-l border-gray-200">
             <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xl shadow-gray-100/50 sticky top-10">
                 
                 {/* Header Badge */}
                 <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gray-100 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md text-gray-600">Superhost</span>
                    <span className="bg-red-50 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md text-red-600">Rare Find</span>
                 </div>

                 {/* Activity Mini Card */}
                 <div className="flex gap-4 pb-6 border-b border-gray-100">
                     <div className="relative w-28 h-24 shrink-0">
                        <img src={activity.images[0]} alt={activity.title} className="w-full h-full object-cover rounded-xl shadow-sm" />
                     </div>
                     <div className="flex flex-col justify-center">
                         <p className="text-xs text-gray-500 font-medium mb-1">{activity.category}</p>
                         <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{activity.title}</h4>
                         <div className="flex items-center gap-1 text-xs mt-1">
                             <StarIcon className="w-3 h-3 text-black fill-black" />
                             <span className="font-bold">{activity.rating}</span>
                             <span className="text-gray-500">({activity.reviewCount} reviews)</span>
                         </div>
                     </div>
                 </div>

                 {/* Price Breakdown */}
                 <div className="py-6 space-y-4">
                     <h3 className="font-bold text-lg text-gray-900">Price details</h3>
                     <div className="flex justify-between text-gray-600 text-base">
                        <span className="underline decoration-gray-300 underline-offset-2">${activity.price} x {guests} guests</span>
                        <span>${activity.price * guests}</span>
                     </div>
                     <div className="flex justify-between text-gray-600 text-base">
                        <span className="underline decoration-gray-300 underline-offset-2">Service fee</span>
                        <span>$15</span>
                     </div>
                     <div className="flex justify-between text-gray-600 text-base">
                        <span className="underline decoration-gray-300 underline-offset-2">Taxes</span>
                        <span>${Math.round(totalPrice * 0.05)}</span>
                     </div>
                 </div>

                 {/* Total */}
                 <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                    <span className="font-bold text-base text-gray-900">Total (USD)</span>
                    <span className="font-black text-2xl text-gray-900">${totalPrice + Math.round(totalPrice * 0.05)}</span>
                 </div>
                 
                 {/* Trust Badge */}
                 <div className="mt-8 flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                     <ShieldCheckIcon className="w-6 h-6 text-[#FF385C] shrink-0 mt-0.5" />
                     <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-gray-900">Free protection</span> from cancellations, listing inaccuracies, and other issues.
                     </p>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;