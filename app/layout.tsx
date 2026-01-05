import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./globals.css";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wanderlust | Adventure Awaits',
  description: 'A premium marketplace for booking adventure activities, hiking, and experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                },
                colors: {
                  primary: {
                    50: '#f0fdf9',
                    100: '#ccfbf1',
                    500: '#14b8a6', // Teal-500
                    600: '#0d9488', // Teal-600
                    700: '#0f766e',
                    900: '#134e4a',
                  }
                },
                keyframes: {
                  'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                  },
                  'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                  }
                },
                animation: {
                  'fade-in-up': 'fade-in-up 0.3s ease-out',
                  'fade-in': 'fade-in 0.2s ease-out',
                }
              }
            }
          }
        `}} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .leaflet-container { background-color: #aad3df; }
        `}</style>
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}