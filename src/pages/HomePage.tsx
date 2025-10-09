import React from "react";
import "../styles/HomePage.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Untuk pindah halaman
import boxIcon from "../assets/BoxIcon.png";

// Data dummy untuk Pie Chart
const pieData = [
  { name: "Available", value: 60, color: "#4CAF50" },
  { name: "Low", value: 20, color: "#F4B400" },
  { name: "Out", value: 20, color: "#E74C3C" },
];

// Data dummy untuk daftar produk
const productData = [
  { id: 1, name: "Coffee Gayo", productId: "100001", category: "Stocked", status: "Low Stock", route: "/coffee-gayo" },
  { id: 2, name: "Grinder", productId: "200001", category: "Non-Stocked", status: "Out Of Stock", route: "/grinder" },
  { id: 3, name: "Diamond Milk", productId: "100001", category: "Stocked", status: "In Stock", route: "/diamond-milk" },
  { id: 4, name: "Coffee Gayo", productId: "100001", category: "Stocked", status: "Low Stock", route: "/coffee-gayo" },
  { id: 5, name: "Coffee Gayo", productId: "100001", category: "Stocked", status: "Low Stock", route: "/coffee-gayo" },
];

// Warna status
const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "#4CAF50";
    case "Low Stock":
      return "#F4B400";
    case "Out Of Stock":
      return "#E74C3C";
    default:
      return "#999";
  }
};

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* Main Layout */}
      <div className="home-content">
        {/* Left Section */}
        <div className="left-section">
          {/* Pie Chart */}
          <div className="chart-card hoverable">
            <h3>Load Percentage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 

                data={pieData} 
                dataKey="value" 
                outerRadius={120} 
                innerRadius={60}
                label={(entry) => `${entry.value}%`}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

         <div className="left-section">
  {/* Kotak besar */}
  <div
    className="main-item large green"
    >
    <img src={boxIcon} alt="Box" />
    <div>
      <p>Main Item</p>
      <h2>2.860</h2>
    </div>
  </div>

  {/* Dua kotak kecil di bawahnya */}
  <div className="box-row">
    <div
      className="main-item small red"
    >
      <img src={boxIcon} alt="Box" />
    <div>
        <p>Main Item</p>
        <h2>2.860</h2>
      </div>
    </div>

    <div
      className="main-item small yellow"
    >
      <img src={boxIcon} alt="Box" />
    <div>
        <p>Main Item</p>
        <h2>2.860</h2>
      </div>
    </div>
  </div>
</div>

        </div>

       {/* Right Section */}
<div className="right-section">
  <div className="inventory-header">
    <div className="search-container">
      <input type="text" placeholder="Search" className="search-input" />
      <FaSearch className="search-icon" />
    </div>
    <button className="btn-30days">Last 30 days</button>
  </div>

          <table className="inventory-table">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Category</th>
                <th>Status</th>
                <th>Supplier</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((item) => (
                <tr
                  key={item.id}
                  className="hoverable"
                  onClick={() => navigate(item.route)} // arahkan ke halaman lain
                  style={{ cursor: "pointer" }}
                >
                  <td className="img-box">🖼️{/* Ganti ini dengan <img src="..." /> sesuai file kamu */}</td>
                  <td>{item.name}</td>
                  <td>{item.productId}</td>
                  <td>{item.category}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(item.status) }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
