import React from "react";
import "../styles/Sidebar.css";
import dashboardIcon from "../assets/DashboardIcon.png";
import inventoryicon from "../assets/InventoryIcon.png";
import memberIcon from "../assets/MemberIcon.png";
// import toerahLogo from "../assets/ToerahLogo.png";
import toerahLogo from "../assets/ToerahLogoNoBG.png";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={toerahLogo} alt="Toerah" className="sidebar-logo" />
          {/* <h2 className="sidebar-title">Toerah Inventory</h2> */}

          <nav className="sidebar-menu">
            <Link
              to="/"
              className={`menu-item ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={onClose}
            >
              <span className="menu-highlight"></span>
              <img src={dashboardIcon} alt="Dashboard" />
              <p>Home</p>
            </Link>
            <Link
              to="/inventory"
              className={`menu-item ${
                location.pathname === "/inventory" ? "active" : ""
              }`}
              onClick={onClose}
            >
              <span className="menu-highlight"></span>
              <img src={inventoryicon} alt="Inventory" />
              <p>Inventory</p>
            </Link>
            <Link
              to="/member"
              className={`menu-item ${
                location.pathname === "/member" ? "active" : ""
              }`}
              onClick={onClose}
            >
              <span className="menu-highlight"></span>
              <img src={memberIcon} alt="Member" />
              <p>Member</p>
            </Link>
          </nav>
        </div>
        <button className="logout-btn" onClick={onClose}>
          Log Out
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
