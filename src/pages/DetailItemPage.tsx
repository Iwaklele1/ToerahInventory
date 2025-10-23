import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DetailItemPage.css";

import {
  getInventoryFromStorage,
  getStockStatus,
} from "../utils/InventoryUtils";
import type { InventoryItem } from "../data/inventoryData";

import searchIcon from "../assets/IconSearch_detailitem.png";
import plusIcon from "../assets/IconPlus_detailitem.png";
import editIcon from "../assets/IconEdit_detailitem.png";
import closeIcon from "../assets/IconCancel_detailitem.png";
import userIcon from "../assets/IconUser_detailitem.png";
import timeIcon from "../assets/IconTime_detailitem.png";
import DeleteIcon from "../assets/IconDelete_detailitem.png";
import iconID from "../assets/IconID_detailitem.png";
import iconProduct from "../assets/IconProduct_detailitem.png";
import iconCeklis from "../assets/IconCeklis_detailitem.png";
import iconStock from "../assets/IconStockedProduct_detailitem.png";

const DetailItemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"vendors" | "history">("vendors");
  const [showSearch, setShowSearch] = useState(false);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showCreateVendorModal, setShowCreateVendorModal] = useState(false);

  const [vendors, setVendors] = useState([
    { name: "Cuisine Supply Inc.", link: "https://cuisine.supply.co" },
    { name: "Bloom Roastery", link: "https://bloomroast.id" },
  ]);

  const [newVendorName, setNewVendorName] = useState("");
  const [newVendorLink, setNewVendorLink] = useState("");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 🔹 Ambil semua data dari localStorage
  const inventoryList: InventoryItem[] = getInventoryFromStorage();

  // 🔹 Ambil produk sesuai ID dari URL
  const item = inventoryList.find((i) => i.id === Number(id));

  if (!item) {
    return (
      <div className="detail-page-container">
        <p style={{ textAlign: "center", padding: "2rem" }}>
          Item not found.
          <br />
          <button onClick={() => navigate(-1)}>← Back</button>
        </p>
      </div>
    );
  }

  // 🔹 Modal handlers
  const handleAddVendor = () => setShowAddVendorModal(true);
  const handleCreateVendor = () => {
    setShowAddVendorModal(false);
    setShowCreateVendorModal(true);
  };

  const handleSaveVendor = () => {
    if (!newVendorName.trim()) return alert("Vendor name cannot be empty!");
    const newVendor = {
      name: newVendorName,
      link: newVendorLink || "(No Link)",
    };
    setVendors((prev) => [...prev, newVendor]);
    setNewVendorName("");
    setNewVendorLink("");
    setShowCreateVendorModal(false);
    setShowAddVendorModal(true);
  };

  return (
    <div className="detail-page-container">
      {/* ================= SIDEBAR ================= */}
      <div className="item-sidebar">
        <div className="item-sidebar-header">
          {!showSearch ? (
            <>
              <button
                className="item-icon-btn left"
                onClick={() => setShowSearch(!showSearch)}
              >
                <img src={searchIcon} alt="search" />
              </button>
              <div className="item-right-icons">
                <button className="item-icon-btn">
                  <img src={plusIcon} alt="add" />
                </button>
                <button className="item-icon-btn">
                  <img src={editIcon} alt="edit" />
                </button>
              </div>
            </>
          ) : (
            <div className="item-search-bar active">
              <input type="text" placeholder="Search product..." autoFocus />
              <button
                className="item-delete"
                onClick={() => setShowSearch(false)}
              >
                <img src={DeleteIcon} alt="delete" />
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Product List Sidebar */}
        <div className="product-list">
          <h4>
            <b>Product List</b>
          </h4>

          {inventoryList.map((product) => (
            <div
              className={`product-item ${
                product.id === Number(id) ? "active" : ""
              }`}
              key={product.id}
              onClick={() => navigate(`/detailitem/${product.id}`)}
            >
              <div className="product-thumb">
                <img src={product.image} alt={product.productName} />
              </div>
              <div className="product-info-mini">
                <p className="product-title">{product.productName}</p>
                <span className="product-id">#{product.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="detail-content">
        <div className="detail-header">
          <button className="item-close-btn" onClick={() => navigate(-1)}>
            <img src={closeIcon} alt="close" />
          </button>
          <h3>{item.productName}</h3>
        </div>

        <div className="detail-body">
          <img src={item.image} alt={item.productName} className="product-image" />

          <div className="product-info">
            <p className="product-desc">{item.description}</p>

            <div className="product-details">
              <div className="detail-item">
                <img src={iconID} alt="ID Icon" />
                <span className="value">{item.id}</span>
              </div>

              <div className="detail-item">
                <img src={iconCeklis} alt="Checklist Icon" />
                <span
                  className={`status ${item.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="detail-item">
                <img src={iconStock} alt="Stock Icon" />
                <span className="label">{item.category}</span>
              </div>

              <div className="detail-item">
                <img src={iconProduct} alt="Product Icon" />
                <span className="label">
                  {item.stock} {item.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab-button ${
                activeTab === "vendors" ? "active" : ""
              }`}
              onClick={() => setActiveTab("vendors")}
            >
              <img src={userIcon} alt="vendors" className="icon-tab" />
              Product Vendors
            </button>

            <button
              className={`tab-button ${
                activeTab === "history" ? "active" : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              <img src={timeIcon} alt="history" className="icon-tab" />
              Order History
            </button>
          </div>
        </div>

        {/* ================= TABLE SECTION ================= */}
        {activeTab === "vendors" ? (
          <div className="detail-item-table-container">
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Vendor Link</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, i) => (
                  <tr key={i}>
                    <td>{vendor.name}</td>
                    <td>{vendor.link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-vendor-btn" onClick={handleAddVendor}>
              + Add Vendor
            </button>
          </div>
        ) : (
          <div className="detail-item-table-container">
            <table>
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Quantity</th>
                  <th>Order Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>16 September 2025</td>
                  <td>100 Kg</td>
                  <td>Fulfilled</td>
                  <td>Rp.1.000.000</td>
                </tr>
                <tr>
                  <td>20 Desember 2025</td>
                  <td>19 Kg</td>
                  <td>In Progress</td>
                  <td>Rp.190.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailItemPage;
