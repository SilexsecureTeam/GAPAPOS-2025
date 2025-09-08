import React, { useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

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
