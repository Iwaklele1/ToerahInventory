import "./App.css";
import Header from "./components/Header";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import DetailInventoryPage from "./pages/DetailInventoryPage";
import MemberPage from "./pages/MemberPage";
import ProtectedRoute from "./route/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        return "";
    }
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <div className="app">
        {!isLoginPage && (
          <>
            <Header
              title={getTitle()}
              onMenuClick={() => setSidebarOpen(true)}
              onProfileClick={() => console.log("Profile clicked")}
            />
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
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
                <DetailInventoryPage />
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

          {/* redirect tidak dikenal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
