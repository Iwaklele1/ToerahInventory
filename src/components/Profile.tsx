// src/components/ProfileSidebar.tsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";
import closeIcon from "../assets/CloseIcon.png";
import profilePicture from "../assets/ProfilePicture.png"
import emailIcon from "../assets/EmailIcon.png"
import passwordIcon from "../assets/PasswordIcon.png"
import telegramIcon from "../assets/TelegramIcon.png"
import telephoneIcon from "../assets/TeleponIcon.png"
import logoutIcon from "../assets/LogoutIcon.png"

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    username: string;
    email: string;
    password: string;
    telegramId: string;
    phone: string;
  } | null;
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, user }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {isOpen && <div className="profile-overlay" onClick={onClose}></div>}

      <div className={`profile ${isOpen ? "open" : ""}`}>
        <div className="profile-header">
          <img
            src={closeIcon}
            alt="close"
            className="close-btn"
            onClick={onClose}
          />
          Profile
        </div>

        <div className="line">
        <hr />
        </div>

        <div className="profile-content">
          {user && (
            <>
              {/* Username section */}
              <div className="profile-section username-block">
                <div className="icon">
                  <img src={profilePicture} alt="Profile" />
                </div>
                <div className="username-text">
                  <strong>Username</strong>
                  <span>{user.username}</span>
                </div>
              </div>

              {/* Info section */}
              <div className="profile-section info-section">
                <div className="info-row">
                  <div className="icon">
                    <img src={emailIcon} alt="Email" />
                  </div>
                  <div>
                    <div className="label">Email</div>
                    <div className="value">{user.email}</div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="icon">
                    <img src={passwordIcon} alt="Password" />
                  </div>
                  <div>
                    <div className="label">Password</div>
                    <div className="value">{user.password}</div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="icon">
                    <img src={telegramIcon} alt="Telegram" />
                  </div>
                  <div>
                    <div className="label">ID Telegram</div>
                    <div className="value">{user.telegramId}</div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="icon">
                    <img src={telephoneIcon} alt="Telephone" />
                  </div>
                  <div>
                    <div className="label">No Telepon</div>
                    <div className="value">{user.phone}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <img src={logoutIcon} alt="Logout" />
          Log Out
        </button>
      </div>
    </>
  );
};

export default Profile;
