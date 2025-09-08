import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

// Map routes to titles and subtitles
const routeContent = {
  "/": {
    title: "Dashboard",
    subtitle: "Welcome back! Here's your business overview.",
  },
  "/new-sales": {
    title: "New Sales",
    subtitle: "Create and manage your sales transactions.",
  },
  "/draft": {
    title: "Draft",
    subtitle: "Review and edit your draft transactions.",
  },
  "/item-lookup": {
    title: "Item Lookup",
    subtitle: "Search and view item details.",
  },
  "/inventory": {
    title: "Inventory",
    subtitle: "Manage your stock and inventory levels.",
  },
  "/customer": {
    title: "Customer",
    subtitle: "View and manage customer information.",
  },
  "/report": {
    title: "Report",
    subtitle: "Analyze your business performance.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Configure your account and preferences.",
  },
};

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Get title and subtitle based on the current route
  const { title, subtitle } = routeContent[location.pathname] || {
    title: "Dashboard",
    subtitle: "Welcome back! Here's your business overview.",
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title={title}
          subtitle={subtitle}
        />

        {/* Main Content */}
        <MainContent isSidebarOpen={isSidebarOpen}>
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
