"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon, MenuIcon, UserCircleIcon } from "./Icons";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isHome
          ? "bg-transparent text-white pt-6"
          : "bg-white text-gray-800 shadow-sm py-3 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xl md:text-2xl font-bold tracking-tight ${
                isHome ? "text-white" : "text-blue-600"
              }`}
            >
              Wanderlust
            </span>
          </Link>

          {/* Search Bar */}
          {!isHome && (
            <>
              {/* Desktop */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-96">
                <div className="flex-1 text-sm font-medium text-gray-600 border-r border-gray-300 pr-4">
                  Anywhere
                </div>
                <div className="flex-1 text-sm font-medium text-gray-600 border-r border-gray-300 px-4">
                  Any week
                </div>
                <div className="flex-1 text-sm text-gray-400 pl-4">
                  Add guests
                </div>
                <div className="bg-blue-500 p-2 rounded-full text-white ml-2">
                  <SearchIcon className="w-4 h-4" />
                </div>
              </div>

              {/* Mobile */}
              <Link
                href="/"
                className="md:hidden flex items-center justify-center bg-gray-100 p-2.5 rounded-full border border-gray-200 text-gray-600 active:scale-95 transition-transform"
              >
                <SearchIcon className="w-5 h-5" />
              </Link>
            </>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {!isHome && (
              <Link
                href="/"
                className="hidden md:block text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition-colors"
              >
                Find adventures
              </Link>
            )}

            <Link
              href="/dashboard"
              className={`hidden md:block text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                isHome ? "hover:bg-white/20" : "hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>

            <div
              className={`flex items-center gap-2 border rounded-full p-1 pl-3 transition-shadow hover:shadow-md cursor-pointer ${
                isHome
                  ? "bg-white border-transparent"
                  : "bg-white border-gray-300"
              }`}
            >
              <MenuIcon className="w-5 h-5 text-gray-600" />
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
