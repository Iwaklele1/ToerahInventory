import "./App.css";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import DetailInventoryPage from "./pages/DetailInventoryPage";
import MemberPage from "./pages/MemberPage";

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

  return (
    <div className="app">
      <Header
        title={getTitle()}
        onMenuClick={() => setSidebarOpen(true)}
        onProfileClick={() => console.log("Profile clicked")}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<DetailInventoryPage />} />
          <Route path="/member" element={<MemberPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
