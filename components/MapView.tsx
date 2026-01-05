"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Activity } from '@/types';
// FIX 1: Import from next/link, not react-router-dom
import Link from 'next/link';
import { MapPinIcon } from './Icons';

// Required for Leaflet to work correctly in production build
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  activities: Activity[];
}

const BoundsHandler = ({ activities }: { activities: Activity[] }) => {
  const map = useMap();

  useEffect(() => {
    if (activities.length === 0) return;

    const latLngs = activities.map(a => [a.coordinates.lat, a.coordinates.lng] as [number, number]);
    const bounds = L.latLngBounds(latLngs);
    
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

  // FIX 2: Memoize icon creation to prevent flickering and performance hits during build/render
  const createPriceIcon = useMemo(() => (price: number) => {
    const priceHtml = `
      <div class="map-price-marker">
        <div class="bg-white text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-md border border-gray-200 cursor-pointer hover:bg-black hover:text-white transition-all text-center">
          $${price}
        </div>
      </div>
    `;
    return L.divIcon({
      className: 'custom-div-icon',
      html: priceHtml,
      iconSize: [60, 30],
      iconAnchor: [30, 15]
    });
  }, []);

  return (
    <div className="w-full h-full relative z-0 isolate min-h-[400px]">
      <MapContainer 
        center={[20, 78]} 
        zoom={4} 
        scrollWheelZoom={true} 
        zoomControl={false}
        className="w-full h-full outline-none z-0 rounded-xl"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=6f08dd5d543f4a6b842faa2da53ec2cd`}
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
              minWidth={280}
              maxWidth={280}
              offset={[0, -10]}
            >
               {/* FIX 1: Next.js Link uses 'href' not 'to' */}
               <Link href={`/activity/${activity.id}`} className="block group w-full no-underline">
                <div className="bg-white flex flex-col w-full rounded-lg overflow-hidden">
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
                     <img 
                        src={activity.images[0]} 
                        alt={activity.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                     />
                  </div>
                  
                  <div className="p-3 flex flex-col gap-0.5">
                     <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 m-0">
                            {activity.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-semibold shrink-0 text-gray-800">
                          <span className="text-yellow-500">★</span> {activity.rating}
                        </div>
                     </div>
                     
                     <p className="text-xs text-gray-500 truncate m-0">{activity.location}</p>
                     
                     <div className="flex items-baseline gap-1 mt-1">
                       <span className="font-bold text-sm text-gray-900">${activity.price}</span>
                       <span className="text-[10px] text-gray-500">/ person</span>
                     </div>
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* UI Overlays */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[1000]">
         <button 
            onClick={handleSearchArea}
            className="bg-white px-5 py-2.5 rounded-full shadow-xl text-sm font-bold text-gray-900 hover:bg-gray-50 transition-all flex items-center gap-2 border border-gray-100"
         >
            {isSearching ? (
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                   Searching...
                </div>
            ) : (
                "Search this area"
            )}
         </button>
      </div>

      <div className="absolute bottom-10 right-4 z-[1000]">
          <button className="bg-white p-3 rounded-full shadow-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors">
             <MapPinIcon className="w-5 h-5" />
          </button>
      </div>
      
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
            padding: 0 !important;
            border-radius: 16px !important;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-popup-content {
            margin: 0 !important;
            width: 280px !important;
        }
        .leaflet-popup-tip-container {
            display: none;
        }
        .custom-div-icon {
            background: none !important;
            border: none !important;
        }
      `}</style>
    </div>
  );
};

export default MapView;