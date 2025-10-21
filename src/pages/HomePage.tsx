import React, { useState } from "react";
import "../styles/HomePage.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  filterInventoryByDate,
  getStockStatusSummary,
} from "../utils/InventoryUtils";
import { useNavigate } from "react-router-dom";
import boxIcon from "../assets/BoxIcon.png";
import searchIcon from "../assets/IconSearch_homepage.png";
import { inventoryData } from "../data/inventoryData";

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
  const [filterType, setFilterType] = useState<"thisMonth" | "custom">(
    "thisMonth"
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredData =
    filterType === "custom"
      ? filterInventoryByDate(inventoryData, fromDate, toDate)
      : filterInventoryByDate(inventoryData);

  const summary = getStockStatusSummary(filteredData);

  const pieData = [
    { name: "In Stock", value: summary.inStock, color: "#4CAF50" },
    { name: "Low Stock", value: summary.lowStock, color: "#F4B400" },
    { name: "Out of Stock", value: summary.outOfStock, color: "#E74C3C" },
  ];
  const navigate = useNavigate();

  // 🔽 State untuk dropdown filter
  const [showFilter, setShowFilter] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  return (
    <>
      <div className="home-wrapper">
        {/* ===== LEFT SECTION ===== */}
        <div className="left-section">
          {/* Pie Chart */}
          <div className="chart-card">
            <h3>Load Percentage</h3>
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
          <div className="table-wrapper">
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
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="hoverable"
                      onClick={() => navigate(`/inventory/${item.id}`)} // contoh routing ke detail item
                      style={{ cursor: "pointer" }}
                    >
                      {/* Gambar Produk */}
                      <td className="image-cell">
                        <div className="product-thumb">
                          <img src={item.image} alt={item.productName} />
                        </div>
                      </td>

                      {/* Nama Produk */}
                      <td className="product-name">{item.productName}</td>

                      {/* ID Produk */}
                      <td>{item.id}</td>

                      {/* Kategori */}
                      <td>{item.category}</td>

                      {/* Status dengan warna */}
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

                      {/* Supplier */}
                      <td>{item.supplier}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "1rem" }}
                    >
                      No data found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
