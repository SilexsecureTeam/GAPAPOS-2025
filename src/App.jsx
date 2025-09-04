import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";

// Lazy-loaded pages
const DashboardLayout = lazy(() => import("./Pages/DashboardLayout"));
const SignIn = lazy(() => import("./auth/SignIn"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} />
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="relative">
                <img
                  src={logo}
                  alt="Loading logo"
                  className="w-20 h-20 animate-scale-pulse relative z-10"
                />
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/*" element={<DashboardLayout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
