import React from 'react'
import "../styles/Header.css";
import openSidebarIcon from "../assets/OpenSidebarIcon.png"
import profileIcon from "../assets/ProfileIcon.png";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick, onProfileClick }) => {
  return (
    <header className="header">
      <div className="header-left" onClick={onMenuClick}>
        <img src={openSidebarIcon} alt="menu" className="header-icon-left" />
      </div>

      <h1 className="header-title">{title}</h1>

      <div className="header-right" onClick={onProfileClick}>
        <img src={profileIcon} alt="profile" className="header-icon-right" />
      </div>
    </header>
  );
};

export default Header