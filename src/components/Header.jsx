import React, { useState } from "react";
import { MapPin, ChevronDown, Menu, X } from "lucide-react";

const Header = ({ toggleSidebar, isSidebarOpen, title, subtitle }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locationOptions = [
    { name: "Main Store", value: "main-store" },
    { name: "Branch A", value: "branch-a" },
    { name: "Branch B", value: "branch-b" },
  ];

  return (
    <header className="bg-white sticky top-0 z-20 shadow-sm p-3 sm:p-4 lg:p-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
      <div className="flex items-center justify-between w-full">
        {/* Hamburger Menu for Mobile */}
        <button className="lg:hidden p-2" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>

        {/* Title and Subtitle */}
        <div className="bg-[#F9F9F9] border border-[#D3D3D3] rounded-lg px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6 max-w-[180px] md:max-w-[400px] w-full flex items-center space-x-2 sm:space-x-3">
          <div className="truncate">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-black truncate">
              {title}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-black truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Location Dropdown (Moved to flex-row on mobile for alignment) */}
        <div className="flex items-center space-x-2 sm:space-x-4 lg:ml-auto">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 hidden sm:block text-[#FFA629]" />
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center text-black text-sm sm:text-base hover:text-purple-800 bg-[#E0DFE4] border border-[#D3D3D3] rounded-lg px-2 sm:px-3 py-1 sm:py-2"
            >
              <span className="text-xs sm:text-sm mr-1 sm:mr-2 truncate">
                Wuse Store
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </button>
            {isLocationOpen && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                {locationOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full text-left px-3 sm:px-4 py-1 sm:py-2 text-black hover:bg-purple-100 hover:text-purple-800 text-xs sm:text-sm lg:text-base"
                    onClick={() => {
                      console.log(`Selected: ${option.name}`);
                      setIsLocationOpen(false);
                    }}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
