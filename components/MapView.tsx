"use client"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Activity } from '@/types';
import { Link } from 'react-router-dom';
import { MapPinIcon } from './Icons';

interface MapViewProps {
  activities: Activity[];
}

// Helper component to handle bounding box updates
const BoundsHandler = ({ activities }: { activities: Activity[] }) => {
  const map = useMap();

  useEffect(() => {
    if (activities.length === 0) return;

    const latLngs = activities.map(a => [a.coordinates.lat, a.coordinates.lng] as [number, number]);
    const bounds = L.latLngBounds(latLngs);
    
    // Check if bounds are valid
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 14 });
    }
  }, [activities, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ activities }) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchArea = () => {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 1500);
  };

  const createPriceIcon = (price: number) => {
    const priceHtml = `
      <div class="transform transition-transform duration-200 hover:scale-110 group relative">
        <div class="bg-white text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] border border-gray-200 cursor-pointer group-hover:bg-gray-900 group-hover:text-white transition-colors text-center whitespace-nowrap">
          $${price}
        </div>
      </div>
    `;
    return L.divIcon({
      className: 'bg-transparent',
      html: priceHtml,
      iconSize: [60, 30],
      iconAnchor: [30, 15]
    });
  };

  return (
    <div className="w-full h-full relative z-0 isolate">
      <MapContainer 
        center={[20, 78]} 
        zoom={4} 
        scrollWheelZoom={true} 
        zoomControl={false}
        className="w-full h-full outline-none z-0 rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=6f08dd5d543f4a6b842faa2da53ec2cd"
        />
        
        <BoundsHandler activities={activities} />

        {activities.map((activity) => (
          <Marker 
            key={activity.id} 
            position={[activity.coordinates.lat, activity.coordinates.lng]}
            icon={createPriceIcon(activity.price)}
          >
            <Popup 
              closeButton={false} 
              className="leaflet-popup-clean"
              minWidth={300}
              maxWidth={300}
              offset={[0, -10]}
            >
               <Link to={`/activity/${activity.id}`} className="block group w-full h-full">
                <div className="bg-white flex flex-col w-full h-full">
                  {/* Image - Aspect Ratio 3:2 for squarer overall card */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
                     <img 
                        src={activity.images[0]} 
                        alt={activity.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                     />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 flex flex-col gap-1">
                     <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">
                            {activity.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-semibold shrink-0">
                          <span>★</span> {activity.rating}
                        </div>
                     </div>
                     
                     <p className="text-xs text-gray-500 truncate">{activity.location}</p>
                     
                     <div className="flex items-baseline gap-1 mt-2">
                       <span className="font-bold text-base text-gray-900">${activity.price}</span>
                       <span className="text-xs text-gray-500">/ person</span>
                     </div>
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}

        {/* Custom Zoom Control could be added here if needed */}
      </MapContainer>
      
      {/* Search Area Pill */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[500]">
         <button 
            onClick={handleSearchArea}
            className="bg-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all flex items-center gap-2"
         >
            {isSearching ? (
                <>
                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                </>
            ) : (
                "Search this area"
            )}
         </button>
      </div>

      {/* Locate Me Button */}
      <div className="absolute bottom-32 right-3 z-[500]">
          <button className="bg-white p-2.5 rounded-lg shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
             <MapPinIcon className="w-5 h-5" />
          </button>
      </div>
      
      {/* Attribution */}
      <div className="absolute bottom-1 right-1 z-[500] text-[10px] bg-white/60 px-1 pointer-events-none text-gray-600 rounded">
        © <a href="https://www.openstreetmap.org/copyright" className="pointer-events-auto hover:underline">OpenStreetMap</a> contributors, © <a href="https://www.geoapify.com/" className="pointer-events-auto hover:underline">Geoapify</a>
      </div>

      <style>{`
        /* Remove default Leaflet popup styles to match clean look */
        .leaflet-popup-content-wrapper {
            border-radius: 12px;
            padding: 0;
            box-shadow: 0 6px 16px rgba(0,0,0,0.12);
            overflow: hidden;
        }
        .leaflet-popup-content {
            margin: 0 !important;
            width: 100% !important;
            line-height: inherit;
        }
        .leaflet-popup-tip {
            box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        .leaflet-container {
            font-family: 'Inter', sans-serif;
            border-radius: 0.75rem;
        }
        /* Fix link styles inside popup inheriting leaflet defaults */
        .leaflet-container a.leaflet-popup-close-button {
            display: none; /* We hid it via prop, but good to ensure */
        }
      `}</style>
    </div>
  );
};

export default MapView;