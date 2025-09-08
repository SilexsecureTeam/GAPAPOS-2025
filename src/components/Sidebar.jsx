// import React, { useState } from "react";
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

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#484C91] overflow-y-auto p-4 lg:p-6 transition-transform duration-300 z-30
        ${
          isOpen
            ? "translate-x-0 w-full lg:w-64"
            : "-translate-x-full w-full lg:w-64"
        }
        lg:translate-x-0 lg:sticky`}
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
                  `flex items-center p-3 font-semibold text-lg rounded-sm border border-[#C6BFD8] text-[#FFFDFD] transition-colors ${
                    isActive && link.name !== "Dashboard"
                      ? "bg-[#F5C82F]"
                      : isActive && link.name === "Dashboard"
                      ? "bg-[#F5C82F]"
                      : ""
                  }`
                }
                onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
              >
                <link.icon className="w-5 h-5 mr-3" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
