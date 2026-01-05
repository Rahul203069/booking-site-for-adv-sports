//@ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ACTIVITIES, getReviewsForActivity } from '@/services/MockData';
import { Activity, Review } from '@/types'; 
import { 
  StarIcon, HeartIcon, ChevronLeftIcon, 
  MapPinIcon, SparklesIcon, ChevronDownIcon,
  ShareIcon // Assuming you have this or use a generic SVG
} from '@/components/Icons';

import BookingSuccessModal from '@/components/BookingSuccessModal';
import BookingModal from '@/components/BookingModal';
import ReviewSection from '@/components/ReviewSection';
import SimpleCalendar from '@/components/SimpleCalendar';
import GuestPicker from '@/components/GuestPicker';

const generateTripAdvice = async (location: string, category: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Tips for ${category} in ${location}:\n1. Wear breathable layers.\n2. Arrive 15 mins early.\n3. Bring a water bottle.`;
};

export default function ActivityDetail() {
  const params = useParams();
  const id = params?.id as string;
  const searchParams = useSearchParams();
  
  const initialDate = searchParams.get('date') || '';
  const initialGuests = Number(searchParams.get('guests')) || 1;

  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [guests, setGuests] = useState(initialGuests);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestPickerRef = useRef<HTMLDivElement>(null);

  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Lock scroll when gallery is open
  useEffect(() => {
    if (showAllPhotos) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAllPhotos]);

  useEffect(() => {
    if (id) {
      const found = ACTIVITIES.find(a => a.id === id);
      if (found) {
        setActivity(found);
        setReviews(getReviewsForActivity(found.id));
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target as Node)) {
        setIsGuestPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGetAdvice = async () => {
    if (!activity) return;
    setLoadingAdvice(true);
    const advice = await generateTripAdvice(activity.location, activity.category);
    setAiAdvice(advice);
    setLoadingAdvice(false);
  };

  const handleBookingConfirm = () => {
    if (!activity) return;
    setShowBookingModal(false);
    const newBooking = {
      id: Math.random().toString(36).substring(2, 11),
      activityId: activity.id,
      activityTitle: activity.title,
      activityImage: activity.images[0],
      date: selectedDate,
      guests: guests,
      totalPrice: (activity.price * guests) + 15,
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([newBooking, ...existing]));
    setTimeout(() => setShowSuccessModal(true), 300);
  };

  if (loading) return (
    <div className="min-h-screen pt-24 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!activity) return <div className="min-h-screen pt-24 text-center">Activity not found</div>;

  const totalPrice = (activity.price * guests) + 15;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{activity.title}</h1>
            <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 font-semibold text-gray-900 underline cursor-pointer">
                <StarIcon className="w-4 h-4" /> {activity.rating}
                </span>
                <span className="underline cursor-pointer font-medium text-gray-600">{activity.reviewCount} reviews</span>
                <span className="flex items-center gap-1 underline cursor-pointer font-medium text-gray-600">
                <MapPinIcon className="w-4 h-4" /> {activity.location}
                </span>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm font-semibold underline">
                Share
            </button>
            <button 
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm font-semibold underline"
            >
                <HeartIcon className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
            </button>
        </div>
      </div>

      {/* Modern Image Grid */}
      <div className="relative group mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[350px] md:h-[500px] rounded-2xl overflow-hidden">
            <div className="md:col-span-2 relative cursor-pointer overflow-hidden" onClick={() => setShowAllPhotos(true)}>
                <Image src={activity.images[0]} alt="Main" fill className="object-cover hover:scale-105 transition-transform duration-500" priority />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-2">
                <div className="relative cursor-pointer overflow-hidden" onClick={() => setShowAllPhotos(true)}>
                    <Image src={activity.images[1] || activity.images[0]} alt="1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative cursor-pointer overflow-hidden" onClick={() => setShowAllPhotos(true)}>
                    <Image src={activity.images[2] || activity.images[0]} alt="2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
            </div>
            <div className="hidden md:grid grid-rows-2 gap-2">
                <div className="relative cursor-pointer overflow-hidden" onClick={() => setShowAllPhotos(true)}>
                    <Image src={activity.images[3] || activity.images[0]} alt="3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative cursor-pointer overflow-hidden" onClick={() => setShowAllPhotos(true)}>
                    <Image src={activity.images[4] || activity.images[0]} alt="4" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
            </div>
        </div>
        
        {/* The "Show all photos" Button */}
        <button 
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 bg-white border border-black px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 z-10"
        >
            <svg viewBox="0 0 16 16" className="w-4 h-4"><path d="M5 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5zM1 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4z"/></svg>
            Show all photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Side: Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="flex justify-between items-center pb-6 border-b">
            <div>
              <h2 className="text-2xl font-semibold">Hosted by {activity.vendor.name}</h2>
              <p className="text-gray-600">{activity.duration} • {activity.difficulty}</p>
            </div>
            <div className="relative w-14 h-14">
              <Image src={activity.vendor.avatarUrl} alt="host" fill className="rounded-full object-cover" />
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="flex gap-4">
              <SparklesIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-2">AI Travel Advice</h3>
                {aiAdvice && <p className="text-sm bg-white p-3 rounded mb-3 whitespace-pre-line">{aiAdvice}</p>}
                <button onClick={handleGetAdvice} className="text-sm font-bold text-blue-700 underline">
                  {loadingAdvice ? "Generating..." : "Get personalized tips"}
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{activity.description}</p>
          <ReviewSection reviews={reviews} rating={activity.rating} reviewCount={activity.reviewCount} />
        </div>

        {/* Right Side: Booking Widget */}
        <div className="md:col-span-1">
          <div className="sticky top-28 p-6 border rounded-xl shadow-lg bg-white">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold">${activity.price} <span className="text-base font-normal text-gray-500">/ person</span></span>
            </div>
            <div className="border rounded-lg mb-4">
              <div className="p-3 border-b cursor-pointer relative" ref={datePickerRef} onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                <p className="text-[10px] font-bold uppercase">Date</p>
                <p className="text-sm">{selectedDate || "Select Date"}</p>
                {isDatePickerOpen && (
                  <div className="absolute top-full left-0 z-50 bg-white shadow-2xl p-2 border rounded-lg">
                    <SimpleCalendar value={selectedDate} onChange={setSelectedDate} onClose={() => setIsDatePickerOpen(false)} />
                  </div>
                )}
              </div>
              <div className="p-3 cursor-pointer relative" ref={guestPickerRef} onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}>
                <p className="text-[10px] font-bold uppercase">Guests</p>
                <div className="flex justify-between items-center text-sm">
                  <span>{guests} guest{guests > 1 ? 's' : ''}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
                {isGuestPickerOpen && (
                  <div className="absolute top-full left-0 w-full z-50 bg-white shadow-2xl border rounded-lg">
                    <GuestPicker value={guests} onChange={setGuests} max={activity.maxGuests} />
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={() => selectedDate ? setShowBookingModal(true) : alert("Pick a date")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Reserve
            </button>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>${activity.price} x {guests}</span><span>${activity.price * guests}</span></div>
              <div className="flex justify-between"><span>Service fee</span><span>$15</span></div>
              <div className="flex justify-between pt-2 border-t font-bold text-gray-900"><span>Total</span><span>${totalPrice}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHOTO GALLERY OVERLAY --- */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300">
          <div className="sticky top-0 bg-white/90 backdrop-blur-sm px-6 py-4 flex justify-between items-center z-[110] border-b">
            <button 
                onClick={() => setShowAllPhotos(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span className="font-semibold">{activity.title} Photos</span>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col gap-6">
            {activity.images.map((img, index) => (
              <div key={index} className="relative w-full aspect-[4/3] md:aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                <Image 
                    src={img} 
                    alt={`Gallery item ${index}`} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} onConfirm={handleBookingConfirm} activity={activity} date={selectedDate} guests={guests} totalPrice={totalPrice} />
      <BookingSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} activityTitle={activity.title} activityImage={activity.images[0]} date={selectedDate} guests={guests} totalPrice={totalPrice} />
    </div>
  );
}