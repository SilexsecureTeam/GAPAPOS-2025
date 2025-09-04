import React, { useState } from "react";
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

export default Sidebar;
