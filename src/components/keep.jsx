study this. make it responsive. it is a dashboard. now it is ohk for large screens. now i want it to be ohk for moblie screens also. that is the harmburger is in the header and open the slidebar ontop of the screen live a navbar for smaller screen. u umderstand the logic. the large screen is perfectly ohk so do not chnage that. import React, { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

const Header = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Sample location options (replace with your actual options)
  const locationOptions = [
    { name: "Main Store", value: "main-store" },
    { name: "Branch A", value: "branch-a" },
    { name: "Branch B", value: "branch-b" },
  ];

  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm p-4 lg:p-6 flex justify-between items-center">
      <div className="flex items-center justify-between w-full space-x-4">
        {/* Title and Subtitle with Location Icon */}
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
        <div className="flex space-x-4 items-center">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFA629]" />
          {/* Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center text-black text-medium hover:text-purple-800 bg-[#E0DFE4] border border-[#D3D3D3] rounded-lg px-3 py-2"
            >
              <span className="text-sm sm:text-base mr-2">Wuse Store</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {isLocationOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                {locationOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full text-left px-4 py-2 text-black hover:bg-purple-100 hover:text-purple-800 text-sm sm:text-base"
                    onClick={() => {
                      // Handle location selection (e.g., update state or context)
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

export default Header;import React from "react";

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 p-4 lg:p-6 bg-white overflow-y-auto">
      {children}
    </main>
  );
};

export default MainContent;import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Search,
  Package,
  Users,
  BarChart2,
  Settings,
} from "lucide-react";
import { Menu, X } from "lucide-react";
import logo from "../assets/dashboardlogo.png";

const navLinks = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "New Sales", path: "/new-sales", icon: ShoppingCart },
  { name: "Draft", path: "/draft", icon: FileText },
  { name: "Item Lookup", path: "/item-lookup", icon: Search },
  { name: "Inventory", path: "/inventory", icon: Package },
  { name: "Customer", path: "/customer", icon: Users },
  { name: "Report", path: "/report", icon: BarChart2 },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <button
        className="lg:hidden p-4 fixed top-0 left-0 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <aside
        className={`w-64 bg-[#484C91] h-screen overflow-y-auto sticky top-0 p-4 lg:p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-10`}
      >
        <div className="mb-8">
          <img src={logo} alt="Gapa Auto POS" className="h-20 w-full" />
        </div>
        <nav>
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 font-semibold text-lg rounded-sm border border-[#C6BFD8] text-[#FFFDFD]  transition-colors ${
                      isActive && link.name !== "Dashboard"
                        ? "bg-[#F5C82F]"
                        : isActive && link.name === "Dashboard"
                        ? "bg-[#F5C82F] "
                        : ""
                    }`
                  }
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;, import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import DashboardHome from "../components/DashboardHome";
import NewSales from "../components/NewSales";
import Draft from "../components/Draft";
import ItemLookup from "../components/ItemLookup";
import Inventory from "../components/Inventory";
import Customer from "../components/Customer";
import Report from "../components/Report";
import Settings from "../components/Settings";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <MainContent>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/new-sales" element={<NewSales />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/item-lookup" element={<ItemLookup />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainContent>
      </div>
    </div>
  );
};

export default DashboardLayout;