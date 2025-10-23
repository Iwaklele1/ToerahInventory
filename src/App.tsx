import "./App.css";
import Header from "./components/Header";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import InventoryPage from "./pages/InventoryPage";
import MemberPage from "./pages/MemberPage";
import ProtectedRoute from "./route/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Profile from "./components/Profile";
import DetailItemPage from "./pages/DetailItemPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  
  // Tentukan judul berdasarkan path
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/inventory":
        return "Inventory";
      case "/member":
        return "Member";
      default:
        return "Detail Item";
    }
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && (
        <>
          <div className="app">
            <Header
              title={getTitle()}
              onMenuClick={() => setSidebarOpen(true)}
              onProfileClick={() => setProfileOpen(true)}
            />
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <Profile
              isOpen={profileOpen}
              onClose={() => setProfileOpen(false)}
            />
          </div>
        </>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member"
          element={
            <ProtectedRoute>
              <MemberPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detailitem/:id"
          element={
            <ProtectedRoute>
              <DetailItemPage />
            </ProtectedRoute>
          }
        />

        {/* redirect tidak dikenal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
