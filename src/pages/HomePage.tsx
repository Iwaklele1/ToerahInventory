import React, { useState } from "react";
import "../styles/HomePage.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import boxIcon from "../assets/BoxIcon.png";
import productImage from "../assets/Rectangle 62.png";
import searchIcon from "../assets/IconSearch_homepage.png";

const pieData = [
  { name: "Available", value: 60, color: "#4CAF50" },
  { name: "Low", value: 20, color: "#F4B400" },
  { name: "Out", value: 20, color: "#E74C3C" },
];

const productData = [
  {
    id: 1,
    name: "Coffee Gayo",
    productId: "100001",
    category: "Stocked",
    status: "Low Stock",
    route: "/coffee-gayo",
  },
  {
    id: 2,
    name: "Grinder",
    productId: "200001",
    category: "Non-Stocked",
    status: "Out Of Stock",
    route: "/grinder",
  },
  {
    id: 3,
    name: "Diamond Milk",
    productId: "100001",
    category: "Stocked",
    status: "In Stock",
    route: "/diamond-milk",
  },
  {
    id: 4,
    name: "Coffee Gayo",
    productId: "100001",
    category: "Stocked",
    status: "Low Stock",
    route: "/coffee-gayo",
  },
  {
    id: 5,
    name: "Coffee Gayo",
    productId: "100001",
    category: "Stocked",
    status: "Low Stock",
    route: "/coffee-gayo",
  },
];

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

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // 🔽 State untuk dropdown filter
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState<"thisMonth" | "custom">(
    "thisMonth"
  );
  const [showCustom, setShowCustom] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <>
      <div className="app home-wrapper">
          {/* ===== LEFT SECTION ===== */}
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
                    label={(entry) => `${entry.value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="left-section">
              <div className="main-item large green">
                <img src={boxIcon} alt="Box" />
                <div>
                  <p>Main Item</p>
                  <h2>2.860</h2>
                </div>
              </div>

              <div className="box-row">
                <div className="main-item small red">
                  <img src={boxIcon} alt="Box" />
                  <div>
                    <p>Main Item</p>
                    <h2>2.860</h2>
                  </div>
                </div>

                <div className="main-item small yellow">
                  <img src={boxIcon} alt="Box" />
                  <div>
                    <p>Main Item</p>
                    <h2>2.860</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SECTION ===== */}
          <div className="right-section">
            <div className="inventory-header">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />
                <img src={searchIcon} alt="search" className="search-icon" />
              </div>

              {/* 🔽 FILTER BUTTON + DROPDOWN */}
              <div className="filter-container">
                <button
                  className={`btn-30days ${showFilter ? "active" : ""}`}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  Last 30 days
                </button>

                {showFilter && (
                  <div className="filter-dropdown right-side">
                    <button
                      className={filterType === "thisMonth" ? "active" : ""}
                      onClick={() => {
                        setFilterType("thisMonth");
                        setShowCustom(false);
                      }}
                    >
                      Last 30 days
                    </button>

                    <button
                      className={filterType === "custom" ? "active" : ""}
                      onClick={() => {
                        setFilterType("custom");
                        setShowCustom(true);
                      }}
                    >
                      Custom
                    </button>

                    {showCustom && (
                      <div className="custom-filter">
                        <label htmlFor="from-date">From</label>
                        <input
                          id="from-date"
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />

                        <label htmlFor="to-date">To</label>
                        <input
                          id="to-date"
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                        />

                        <div className="filter-actions">
                          <button
                            type="button"
                            className="clear-btn"
                            onClick={() => {
                              setFromDate("");
                              setToDate("");
                            }}
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            className="apply-btn"
                            onClick={() => {
                              alert(
                                `Tanggal diterapkan:\nDari: ${
                                  fromDate || "-"
                                }\nSampai: ${toDate || "-"}`
                              );
                              setShowFilter(false);
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ===== TABLE SECTION ===== */}
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
                    onClick={() => navigate(item.route)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Kolom gambar */}
                    <td className="image-cell">
                      <div className="product-thumb">
                        <img src={productImage} alt={item.name} />
                      </div>
                    </td>

                    {/* Kolom nama produk */}
                    <td className="product-name">{item.name}</td>

                    {/* Kolom lainnya */}
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
    </>
  );
};

export default HomePage;
