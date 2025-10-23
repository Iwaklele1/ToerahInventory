import React, { useState } from "react";
import "../styles/MemberPage.css";
import searchIcon from "../assets/Iconsearch_memberpage.png";
import warningSign from "../assets/WarningSign_memberpage.png";
import { memberData } from "../data/memberData";

interface Member {
  id: number;
  username: string;
  telegramId: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const MemberPage: React.FC = () => {
  // ✅ Data awal dari memberData
  const [members, setMembers] = useState<Member[]>(memberData);

  // ✅ State untuk tambah member baru
  const [newMember, setNewMember] = useState<Member>({
    id: members.length + 1,
    username: "",
    telegramId: "",
    email: "",
    password: "",
    phone: "",
    role: "member",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);

  // ✅ Handle perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Tambah member baru
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newMember.username &&
      newMember.telegramId &&
      newMember.email &&
      newMember.password &&
      newMember.phone
    ) {
      const newId = members.length > 0 ? members[members.length - 1].id + 1 : 1;
      const newEntry = { ...newMember, id: newId };
      setMembers([...members, newEntry]);
      setNewMember({
        id: newId + 1,
        username: "",
        telegramId: "",
        email: "",
        password: "",
        phone: "",
        role: "member",
      });
    } else {
      alert("Please fill all fields!");
    }
  };

  // ✅ Konfirmasi delete member
  const confirmDelete = (id: number) => {
    setMemberToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteMember = () => {
    if (memberToDelete !== null) {
      const updated = members.filter((m) => m.id !== memberToDelete);
      setMembers(updated);
    }
    setShowConfirm(false);
    setMemberToDelete(null);
  };

  // ✅ Filter pencarian
  const filteredMembers = members.filter(
    (m) =>
      m.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.telegramId.includes(searchTerm)
  );

  return (
    <div className="member-page">
      {/* ==================== TABLE SECTION ==================== */}
      <div className="table-section">
        {/* ===== SEARCH BAR + BUTTON ===== */}
        <div className="search-filter-group">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={searchIcon} alt="search" className="search-icon" />
          </div>

          <button
            className="add-member-btn"
            onClick={() => alert("Form di sebelah kanan ➜")}
          >
            + Add Member
          </button>
        </div>

        {/* ===== HEADER TABEL ===== */}
        <div className="table-header">
          <div>Username</div>
          <div>Telegram ID</div>
          <div>Email</div>
          <div>Role</div>
          <div>Phone</div>
          <div>Action</div>
        </div>

        {/* ===== SCROLLABLE BODY ===== */}
        <div className="member-table-wrapper">
          <div className="member-table-body">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div className="table-row" key={member.id}>
                  <div>{member.username}</div>
                  <div>{member.telegramId}</div>
                  <div>{member.email}</div>
                  <div>{member.role}</div>
                  <div>{member.phone}</div>
                  <div>
                    <button
                      className="kick-btn"
                      onClick={() => confirmDelete(member.id)}
                    >
                      Kick
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="table-row"
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  gridColumn: "1 / -1",
                }}
              >
                No members found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== FORM SECTION ==================== */}
      <div className="form-section">
        <h3>Add Member Form</h3>
        <form onSubmit={handleAddMember}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={newMember.username}
            onChange={handleChange}
          />

          <label>Telegram ID</label>
          <input
            type="text"
            name="telegramId"
            value={newMember.telegramId}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={newMember.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={newMember.password}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={newMember.phone}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Add Member
          </button>
        </form>
      </div>

      {/* ==================== POPUP KONFIRMASI ==================== */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h4>
              <img
                src={warningSign}
                alt="warning"
                style={{
                  width: "28px",
                  verticalAlign: "middle",
                  marginRight: "8px",
                }}
              />
              Are you sure to kick this member?
            </h4>
            <p>
              This action cannot be undone. The member will be permanently
              removed from the list.
            </p>
            <div className="confirm-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                No, cancel
              </button>
              <button className="confirm-btn" onClick={handleDeleteMember}>
                Yes, I’m sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPage;
