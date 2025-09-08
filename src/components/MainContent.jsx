import React from "react";

const MainContent = ({ children, isSidebarOpen }) => {
  return (
    <div className="relative flex-1">
      {/* Dimming Overlay for Mobile when Sidebar is Open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 lg:hidden" />
      )}
      <main className="flex-1 p-4 lg:p-6 bg-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainContent;
