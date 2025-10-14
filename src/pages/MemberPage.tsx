import React, { useState } from "react";
import "../styles/MemberPage.css";
import { FaSearch } from "react-icons/fa";

interface Member {
  username: string;
  telegramId: string;
  email: string;
  password: string;
  phone: string;
}

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    {
      username: "Gabriel Deni",
      telegramId: "100001",
      email: "gabrieldeni@gmail.com",
      password: "member001",
      phone: "081234567890",
    },
    {
      username: "Ibnu Dzaki",
      telegramId: "200001",
      email: "ibnudzaki@gmail.com",
      password: "member002",
      phone: "080987654321",
    },
    {
      username: "Nabil Junior",
      telegramId: "300001",
      email: "nabiljunior@gmail.com",
      password: "member003",
      phone: "082134567890",
    },
  ]);

  const [newMember, setNewMember] = useState<Member>({
    username: "",
    telegramId: "",
    email: "",
    password: "",
    phone: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);

  const handleAddMember = () => {
    if (
      newMember.username &&
      newMember.telegramId &&
      newMember.email &&
      newMember.password &&
      newMember.phone
    ) {
      setMembers([...members, newMember]);
      setNewMember({
        username: "",
        telegramId: "",
        email: "",
        password: "",
        phone: "",
      });
    } else {
      alert("Please fill all fields!");
    }
  };

  const confirmDelete = (index: number) => {
    setMemberToDelete(index);
    setShowConfirm(true);
  };

  const handleDeleteMember = () => {
    if (memberToDelete !== null) {
      const updated = [...members];
      updated.splice(memberToDelete, 1);
      setMembers(updated);
    }
    setShowConfirm(false);
    setMemberToDelete(null);
  };

  const filteredMembers = members.filter(
    (m) =>
      m.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.telegramId.includes(searchTerm)
  );

  return (
    <div className="member-page">
      {/* ============ BAGIAN TABEL MEMBER ============ */}
      <div className="table-section">
        <div className="search-filter-group">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-icon">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="member-table">
          <div className="table-header">
            <div>Username</div>
            <div>ID Telegram</div>
            <div>Email</div>
            <div>Password</div>
            <div>Phone</div>
            <div>Action</div>
          </div>

          <div className="table-body">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, index) => (
                <div className="table-row" key={index}>
                  <div>{member.username}</div>
                  <div>{member.telegramId}</div>
                  <div>{member.email}</div>
                  <div>{member.password}</div>
                  <div>{member.phone}</div>
                  <div>
                    <button
                      className="kick-btn"
                      onClick={() => confirmDelete(index)}
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
                  gridColumn: "1 / -1",
                  color: "#555",
                }}
              >
                No members found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============ BAGIAN FORM TAMBAH MEMBER ============ */}
      <div className="form-section">
        <h3>Add New Member</h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={newMember.username}
          onChange={(e) =>
            setNewMember({ ...newMember, username: e.target.value })
          }
        />

        <label>ID Telegram</label>
        <input
          type="text"
          placeholder="Enter Telegram ID"
          value={newMember.telegramId}
          onChange={(e) =>
            setNewMember({ ...newMember, telegramId: e.target.value })
          }
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={newMember.email}
          onChange={(e) =>
            setNewMember({ ...newMember, email: e.target.value })
          }
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={newMember.password}
          onChange={(e) =>
            setNewMember({ ...newMember, password: e.target.value })
          }
        />

        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={newMember.phone}
          onChange={(e) =>
            setNewMember({ ...newMember, phone: e.target.value })
          }
        />

        <button className="submit-btn" onClick={handleAddMember}>
          Submit
        </button>
      </div>

      {/* ============ POPUP KONFIRMASI DELETE ============ */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h4>⚠️ Are you sure to kick this member?</h4>
            <p>
              This action cannot be undone. This will permanently delete this
              member from the list.
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
