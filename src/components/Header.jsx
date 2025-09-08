import React, { useState } from "react";
import { MapPin, ChevronDown, Menu, X } from "lucide-react";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locationOptions = [
    { name: "Main Store", value: "main-store" },
    { name: "Branch A", value: "branch-a" },
    { name: "Branch B", value: "branch-b" },
  ];

  return (
    <header className="bg-white sticky top-0 z-20 shadow-sm p-4 lg:p-6 flex justify-between items-center">
      <div className="flex items-center justify-between w-full space-x-4">
        {/* Hamburger Menu for Mobile */}
        <button className="lg:hidden p-2" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Title and Subtitle */}
        <div className="bg-[#F9F9F9] border border-[#D3D3D3] rounded-lg px-4 sm:px-8 py-4 sm:py-6 max-w-[500px] w-full flex items-center space-x-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-black">
              Welcome back! Here's your business overview.
            </p>
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="flex space-x-4 items-center">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFA629]" />
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center text-black text-medium hover:text-purple-800 bg-[#E0DFE4] border border-[#D3D3D3] rounded-lg px-3 py-2"
            >
              <span className="text-sm sm:text-base mr-2">Wuse Store</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {isLocationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                {locationOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full text-left px-4 py-2 text-black hover:bg-purple-100 hover:text-purple-800 text-sm sm:text-base"
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
