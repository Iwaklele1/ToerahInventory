// src/pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  filterInventoryByDate,
  getStockStatusSummary,
  getInventoryFromStorage,
} from "../utils/InventoryUtils";
import { useNavigate } from "react-router-dom";
import boxIcon from "../assets/BoxIcon.png";
import searchIcon from "../assets/IconSearch_homepage.png";
import { getStockStatus } from "../utils/InventoryUtils";
import { inventoryData } from "../data/inventoryData";
import type { InventoryItem } from "../data/inventoryData";

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "#4CAF50";
    case "Low Stock":
      return "#F4B400";
    case "Out of Stock":
      return "#E74C3C";
    default:
      return "#999";
  }
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState<"thisMonth" | "custom">("thisMonth");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Ambil data dari localStorage, atau fallback ke data default
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const stored = getInventoryFromStorage();
    if (stored.length > 0) {
      // hitung ulang status biar aman
      const normalized = stored.map((item) => ({
        ...item,
        status: getStockStatus(item.stock, item.capacity),
      }));
      setInventoryList(normalized);
    } else {
      // fallback ke data default
      const normalized = inventoryData.map((item) => ({
        ...item,
        status: getStockStatus(item.stock, item.capacity),
      }));
      setInventoryList(normalized);
    }
  }, []);

  // 🔹 Filter tanggal
  const filteredData =
    filterType === "custom"
      ? filterInventoryByDate(inventoryList, fromDate, toDate)
      : filterInventoryByDate(inventoryList);

  // 🔹 Pencarian produk
  const displayedData = filteredData.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Ringkasan stok (pie chart)
  const summary = getStockStatusSummary(filteredData);
  const pieData = [
    { name: "In Stock", value: summary.inStock, color: "#4CAF50" },
    { name: "Low Stock", value: summary.lowStock, color: "#F4B400" },
    { name: "Out of Stock", value: summary.outOfStock, color: "#E74C3C" },
  ];

  return (
    <div className="home-wrapper">
      {/* ===== LEFT SECTION ===== */}
      <div className="left-section">
        {/* Pie Chart */}
        <div className="chart-card">
          <h3>Stock Overview</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={150}
                  innerRadius={70}
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    const radius =
                      innerRadius + (outerRadius - innerRadius) / 2;
                    const x =
                      cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y =
                      cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#fff"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={20}
                        fontWeight={700}
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary boxes */}
        <div className="left-section">
          <div className="main-item large green">
            <img src={boxIcon} alt="Box" />
            <div>
              <p>In Stock</p>
              <h2>{summary.inStock}</h2>
            </div>
          </div>

          <div className="box-row">
            <div className="main-item small yellow">
              <img src={boxIcon} alt="Box" />
              <div>
                <p>Low Stock</p>
                <h2>{summary.lowStock}</h2>
              </div>
            </div>

            <div className="main-item small red">
              <img src={boxIcon} alt="Box" />
              <div>
                <p>Out of Stock</p>
                <h2>{summary.outOfStock}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT SECTION ===== */}
      <div className="right-section">
        <div className="home-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={searchIcon} alt="search" className="search-icon" />
          </div>

          {/* Filter Dropdown */}
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
                        onClick={() => setShowFilter(false)}
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

        {/* ===== TABLE ===== */}
        <div className="table-wrapper">
          <table className="home-table">
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
              {displayedData.length > 0 ? (
                displayedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hoverable"
                    onClick={() => navigate(`/detailitem/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="image-cell">
                      <div className="product-thumb">
                        <img src={item.image} alt={item.productName} />
                      </div>
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(item.status),
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.supplier}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                    No data found for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
