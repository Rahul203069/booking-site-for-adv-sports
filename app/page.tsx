'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ACTIVITIES, CATEGORIES } from '@/services/MockData';
import ActivityCard from '../components/ActivityCard';
import SimpleCalendar from '../components/SimpleCalendar';
import GuestPicker from '../components/GuestPicker';
import { SearchIcon, MapIcon, ListIcon, MapPinIcon } from '../components/Icons';

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('../components/MapView'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl" />
});

const GEOAPIFY_API_KEY = "6f08dd5d543f4a6b842faa2da53ec2cd";

interface Suggestion {
  properties: {
    formatted: string;
    city: string;
    country: string;
    place_id: string;
  };
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState<number | ''>('');
  
  // View State
  const [showMap, setShowMap] = useState(false);
  
  // Autocomplete State
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Date Picker State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateWrapperRef = useRef<HTMLDivElement>(null);

  // Guest Picker State
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const guestWrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions and date picker on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (guestWrapperRef.current && !guestWrapperRef.current.contains(event.target as Node)) {
        setShowGuestPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, dateWrapperRef, guestWrapperRef]);

  // Fetch Suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (locationQuery.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(locationQuery)}&apiKey=${GEOAPIFY_API_KEY}`);
        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    // Debounce
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [locationQuery]);

  const filteredActivities = ACTIVITIES.filter(activity => {
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesLocation = activity.location.toLowerCase().includes(locationQuery.toLowerCase()) || 
                          activity.title.toLowerCase().includes(locationQuery.toLowerCase());
    const matchesGuests = !guestCount || activity.maxGuests >= Number(guestCount);
    const matchesDate = !selectedDate || true; 

    return matchesCategory && matchesLocation && matchesGuests && matchesDate;
  });

  const handleSearchClick = () => {
    const element = document.getElementById('experiences-grid');
    if(element) element.scrollIntoView({ behavior: 'smooth' });
    setShowSuggestions(false);
    setShowDatePicker(false);
    setShowGuestPicker(false);
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setLocationQuery(suggestion.properties.formatted); 
    setShowSuggestions(false);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      {!showMap && (
        <div className="relative h-[600px] flex items-center justify-center z-40">
          <div className="absolute inset-0">
            <img 
              src="https://picsum.photos/1920/1080?grayscale&blur=2" 
              alt="Hero background" 
              className="w-full h-full object-cover brightness-50"
            />
          </div>
          
          <div className="relative z-10 w-full max-w-4xl px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Find your next adventure
            </h1>
            <p className="text-xl text-gray-100 mb-10 drop-shadow-md">
              Discover unique experiences led by one-of-a-kind hosts.
            </p>
            
            {/* Optimized Search Bar */}
            <div className="bg-white rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row shadow-2xl max-w-3xl mx-auto relative z-50">
               {/* Location Input */}
               <div className="flex-1 px-6 py-4 md:py-3 hover:bg-gray-50 md:hover:bg-gray-100 rounded-2xl md:rounded-full cursor-pointer text-left relative border-b md:border-b-0 border-gray-100" ref={wrapperRef}>
                  <label className="block text-xs font-bold text-gray-800 tracking-wider mb-0.5">LOCATION</label>
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-medium truncate text-base"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  
                  {/* Autocomplete Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 md:-left-4 mt-3 w-full md:w-[350px] max-h-[300px] overflow-y-auto no-scrollbar bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60]">
                      {suggestions.map((suggestion) => (
                        <div 
                          key={suggestion.properties.place_id}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                          onClick={() => handleSelectSuggestion(suggestion)}
                        >
                           <div className="bg-gray-100 p-2.5 rounded-xl shrink-0">
                             <MapPinIcon className="w-5 h-5 text-gray-600" />
                           </div>
                           <div className="text-left min-w-0">
                             <div className="font-semibold text-gray-900 text-sm truncate">{suggestion.properties.city || suggestion.properties.country || "Unknown Location"}</div>
                             <div className="text-xs text-gray-500 truncate">{suggestion.properties.formatted}</div>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               <div className="w-px bg-gray-200 my-2 hidden md:block"></div>

               {/* Date Picker */}
               <div className="flex-1 px-6 py-4 md:py-3 hover:bg-gray-50 md:hover:bg-gray-100 rounded-2xl md:rounded-full cursor-pointer text-left relative border-b md:border-b-0 border-gray-100" ref={dateWrapperRef}>
                  <div onClick={() => setShowDatePicker(!showDatePicker)} className="w-full h-full">
                    <label className="block text-xs font-bold text-gray-800 tracking-wider mb-0.5 cursor-pointer">DATE</label>
                    <div className={`text-sm font-medium truncate py-0.5 cursor-pointer text-base ${selectedDate ? 'text-gray-900' : 'text-gray-400'}`}>
                        {selectedDate ? formatDisplayDate(selectedDate) : 'Add dates'}
                    </div>
                  </div>
                  
                  {showDatePicker && (
                    <div className="absolute top-full left-1/2 md:left-1/2 transform -translate-x-1/2 mt-3 p-5 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[60] animate-fade-in-up w-[340px] md:w-auto">
                       <SimpleCalendar 
                          value={selectedDate} 
                          onChange={setSelectedDate} 
                          onClose={() => setShowDatePicker(false)} 
                       />
                    </div>
                  )}
               </div>

               <div className="w-px bg-gray-200 my-2 hidden md:block"></div>

               {/* Guest Picker & Search Button */}
               <div className="flex-1 pl-6 pr-2 py-2 hover:bg-gray-50 md:hover:bg-gray-100 rounded-2xl md:rounded-full cursor-pointer text-left flex items-center justify-between relative" ref={guestWrapperRef}>
                  <div className="flex-grow w-full h-full py-2 md:py-0" onClick={() => setShowGuestPicker(!showGuestPicker)}>
                    <label className="block text-xs font-bold text-gray-800 tracking-wider mb-0.5 cursor-pointer">GUESTS</label>
                    <div className={`text-sm font-medium truncate py-0.5 cursor-pointer text-base ${guestCount ? 'text-gray-900' : 'text-gray-400'}`}>
                        {guestCount ? `${guestCount} guest${guestCount !== 1 ? 's' : ''}` : 'Add guests'}
                    </div>
                  </div>

                  {showGuestPicker && (
                     <div className="absolute top-full right-0 mt-3 p-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[60] animate-fade-in-up overflow-hidden w-full md:w-auto min-w-[300px]">
                        <GuestPicker 
                            value={Number(guestCount) || 1}
                            onChange={(val) => setGuestCount(val)}
                        />
                     </div>
                  )}

                  <button 
                    onClick={handleSearchClick}
                    className="bg-blue-500 hover:bg-primary-600 text-white rounded-full p-4 md:p-4 shadow-lg transition-transform hover:scale-105 ml-2 shrink-0 flex items-center gap-2"
                  >
                    <SearchIcon className="w-6 h-6" />
                    <span className="md:hidden font-bold pr-2">Search</span>
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Filters */}
      <div className={`sticky top-0 z-30 bg-white shadow-sm ${showMap ? 'pt-20' : 'pt-4'} pb-2 transition-all`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {showMap && (
               <div className="flex items-center gap-4 mb-4 overflow-x-auto no-scrollbar pb-2">
                   <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 flex-1 min-w-[200px]">
                      <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <input 
                        className="bg-transparent outline-none text-sm w-full"
                        placeholder="Search location..."
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                      />
                   </div>
                   <button 
                     onClick={() => setShowMap(false)} 
                     className="whitespace-nowrap px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50"
                   >
                     Close Map
                   </button>
               </div>
            )}
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`flex flex-col items-center gap-2 min-w-fit px-2 pb-2 border-b-2 transition-all ${selectedCategory === 'All' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}
              >
                <span className="text-2xl">🌍</span>
                <span className="text-xs font-medium">All</span>
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex flex-col items-center gap-2 min-w-fit px-2 pb-2 border-b-2 transition-all ${selectedCategory === cat.name ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
         </div>
      </div>

      {/* Grid or Map View Container */}
      <div id="experiences-grid" className={`${showMap ? 'h-[calc(100vh-180px)]' : 'min-h-[500px] py-10'} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        {!showMap && (
           <h2 className="text-2xl font-bold mb-6 text-gray-900">
               {filteredActivities.length > 0 
                   ? `${filteredActivities.length} adventure${filteredActivities.length !== 1 ? 's' : ''} found` 
                   : 'Top experiences'}
           </h2>
        )}
        
        {showMap ? (
           <div className="h-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
             <MapView activities={filteredActivities} />
           </div>
        ) : (
           <>
              {filteredActivities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {filteredActivities.map(activity => (
                    <ActivityCard 
                      key={activity.id} 
                      activity={activity} 
                      searchParams={{
                          date: selectedDate,
                          guests: Number(guestCount) || 1
                      }}
                    />
                  ))}
                </div>
              ) : (
                 <div className="text-center py-20">
                   <h3 className="text-xl text-gray-500">No activities found matching your criteria.</h3>
                   <button onClick={() => {setLocationQuery(''); setSelectedCategory('All'); setGuestCount(''); setSelectedDate('');}} className="mt-4 text-primary-600 font-medium hover:underline">Clear filters</button>
                 </div>
              )}
           </>
        )}
      </div>

      {/* Map Toggle */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
        <button 
          onClick={() => setShowMap(!showMap)}
          className="bg-[#222222] hover:scale-105 active:scale-95 text-white px-5 py-3.5 rounded-full shadow-xl flex items-center gap-2 transition-all duration-200"
        >
          {showMap ? (
            <>
              <span className="text-sm font-semibold">Show list</span>
              <ListIcon className="w-5 h-5" />
            </>
          ) : (
            <>
              <span className="text-sm font-semibold">Show map</span>
              <MapIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}