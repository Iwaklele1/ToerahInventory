import React, { useState, useRef } from "react";
import "../styles/InventoryPage.css";
import { useNavigate } from "react-router-dom";
import iconFilter from "../assets/IconFilter_inventorypage.png";
import iconSearch from "../assets/IconSearch_inventorypage.png";
import { filterInventoryByDate } from "../utils/InventoryUtils";
import { inventoryData } from "../data/inventoryData";
import { InventoryCUD } from "../utils/InventoryCUD";

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("thisMonth");
  const filterRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [showFilter, setShowFilter] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔹 Gunakan state yang bisa berubah (bukan data statis)
  const [inventoryList, setInventoryList] = useState(inventoryData);

  // 🔹 Panggil hook InventoryCUD
  const {
    newProduct,
    isEditMode,
    handleAddProduct,
    handleUpdateProduct,
    handleDelete,
    handleEdit,
    setNewProduct,
    setIsEditMode,
  } = InventoryCUD(inventoryList, setInventoryList);

  // 🔹 Pastikan filter ambil dari state, bukan dari data statis
  const filteredData =
    filterType === "custom"
      ? filterInventoryByDate(inventoryList, fromDate, toDate)
      : filterInventoryByDate(inventoryList);

  // 🔹 Terapkan pencarian
  const displayedData = filteredData.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-main">
      {/* ===== LEFT SIDE ===== */}
      <div className="inventory-container">
        {/* ===== TOP BAR ===== */}
        <div className="inventory-top">
          <div className="inventory-search-filter-group">
            {/* 🔍 Search Bar */}
            <div className="inventory-search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={iconSearch} alt="search" className="search-icon" />
            </div>

            {/* 🔽 Filter Dropdown */}
            <div className="inventory-filter-wrapper" ref={filterRef}>
              <img
                src={iconFilter}
                alt="filter"
                className={`inventory-filter-btn ${showFilter ? "active" : ""}`}
                onClick={() => setShowFilter(!showFilter)}
              />

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

          {/* 🔹 Action Buttons */}
          <div className="inventory-action-buttons">
            <button
              className={`btn-new ${!isEditMode ? "active" : ""}`}
              onClick={() => setIsEditMode(false)}
            >
              New Product
            </button>
            <button
              className={`btn-edit ${isEditMode ? "active" : ""}`}
              onClick={() => setIsEditMode(true)}
            >
              Edit Product
            </button>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Category</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Type</th>
                {user?.role === "member" && <th>Supplier</th>}
                {user?.role === "admin" && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {displayedData.length > 0 ? (
                displayedData.map((item) => (
                  <tr key={item.id} className="hoverable">
                    <td>
                      <div className="product-thumb">
                        <img src={item.image} alt={item.productName} />
                      </div>
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>
                      <span
                        className={`status-badge ${item.status
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.stock}</td>
                    <td>{item.type}</td>
                    {user?.role === "member" && <td>{item.supplier}</td>}
                    {user?.role === "admin" && (
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== RIGHT SIDE ===== */}
      <div className="manage-inventory">
        <h3>{isEditMode ? "Edit Product" : "Add New Product"}</h3>

        <form onSubmit={isEditMode ? handleUpdateProduct : handleAddProduct}>
          {isEditMode ? (
            <>
              <label>Select Product</label>
              <select
                value={newProduct.id || ""}
                onChange={(e) => {
                  const selected = inventoryList.find(
                    (item) => item.id === Number(e.target.value)
                  );
                  if (selected) setNewProduct({ ...selected });
                }}
              >
                <option value="">Select Product ID</option>
                {inventoryList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id} — {item.productName}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productName: e.target.value })
                }
              />
            </>
          )}

          {/* STOCK */}
          <label>Stock Quantity</label>
          <div className="quantity-control">
            <button
              type="button"
              onClick={() =>
                setNewProduct({
                  ...newProduct,
                  stock: Math.max(0, newProduct.stock - 1),
                })
              }
            >
              -
            </button>
            <span>{newProduct.stock}</span>
            <button
              type="button"
              onClick={() =>
                setNewProduct({
                  ...newProduct,
                  stock: newProduct.stock + 1,
                })
              }
            >
              +
            </button>
          </div>

          {/* TYPE */}
          <label>Unit Type</label>
          <select
            value={newProduct.type}
            onChange={(e) =>
              setNewProduct({ ...newProduct, type: e.target.value })
            }
          >
            <option value="Pcs">Pcs</option>
            <option value="Kg">Kg</option>
            <option value="Gram">Gram</option>
            <option value="L">L</option>
            <option value="mL">mL</option>
            <option value="Box">Box</option>
          </select>

          {/* CATEGORY */}
          <label>Category</label>
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                category: e.target.value as "Stocked" | "Non-Stocked",
              })
            }
          >
            <option value="Stocked">Stocked</option>
            <option value="Non-Stocked">Non-Stocked</option>
          </select>

          {/* SUPPLIER */}
          <label>Supplier</label>
          <input
            type="text"
            placeholder="Enter supplier name"
            value={newProduct.supplier}
            onChange={(e) =>
              setNewProduct({ ...newProduct, supplier: e.target.value })
            }
          />

          {/* DESCRIPTION */}
          <label>Description</label>
          <textarea
            placeholder="Enter product description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />

          {/* IMAGE */}
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL or leave default"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />

          <button type="submit">
            {isEditMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryPage;
