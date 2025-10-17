// src/components/ProfileSidebar.tsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";
import { FaLock, FaPhone, FaTelegramPlane } from "react-icons/fa";

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

      <div className={`profile-sidebar ${isOpen ? "open" : ""}`}>
        <div className="profile-header">
          <button className="close-btn" onClick={onClose}>×</button>
          Profile
        </div>

        <div className="profile-content">
          {user && (
            <>
              {/* Username section */}
              <div className="profile-section username-block">
                <div className="icon"></div>
                <div className="username-text">
                  <strong>Username</strong>
                  <span>{user.username}</span>
                </div>
              </div>

              {/* Info section */}
              <div className="profile-section">
                <div className="info-row">
                  <div className="icon"></div>
                  <div>
                    <div className="label">Email</div>
                    <div className="value">{user.email}</div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="icon"><FaLock /></div>
                  <div>
                    <div className="label">Password</div>
                    <div className="value">{user.password}</div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="icon"><FaTelegramPlane /></div>
                  <div>
                    <div className="label">ID Telegram</div>
                    <div className="value">{user.telegramId}</div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="icon"><FaPhone /></div>
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
           Log Out
        </button>
      </div>
    </>
  );
};

export default Profile;
