import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";
import closeIcon from "../assets/CloseIcon.png";
import profilePicture from "../assets/ProfilePicture.png";
import emailIcon from "../assets/EmailIcon.png";
import passwordIcon from "../assets/PasswordIcon.png";
import telegramIcon from "../assets/TelegramIcon.png";
import telephoneIcon from "../assets/TeleponIcon.png";
import logoutIcon from "../assets/LogoutIcon.png";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // hapus user dari context & localStorage
    onClose(); // tutup popup
    navigate("/login"); // arahkan ke halaman login
  };

  if (!user) return null; // tidak tampil jika belum login

  return (
    <>
      {/* Overlay untuk menutup ketika klik di luar */}
      {isOpen && <div className="profile-overlay" onClick={onClose}></div>}

      {/* Sidebar profile */}
      <div className={`profile ${isOpen ? "open" : ""}`}>
        {/* Header */}
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

        {/* Content */}
        <div className="profile-content">
          <div className="profile-section username-block">
            <div className="icon">
              <img src={profilePicture} alt="Profile" />
            </div>
            <div className="username-text">
              <strong>Username</strong>
              <span>{user.username}</span>
            </div>
          </div>

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

            {user.telegramId && (
              <div className="info-row">
                <div className="icon">
                  <img src={telegramIcon} alt="Telegram" />
                </div>
                <div>
                  <div className="label">ID Telegram</div>
                  <div className="value">{user.telegramId}</div>
                </div>
              </div>
            )}

            {user.phone && (
              <div className="info-row">
                <div className="icon">
                  <img src={telephoneIcon} alt="Telephone" />
                </div>
                <div>
                  <div className="label">No Telepon</div>
                  <div className="value">{user.phone}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tombol logout */}
        <button className="logout-btn" onClick={handleLogout}>
          <img src={logoutIcon} alt="Logout" />
          Log Out
        </button>
      </div>
    </>
  );
};

export default Profile;
