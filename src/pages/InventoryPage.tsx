// src/pages/InventoryPage.tsx
import React, { useState, useRef } from "react";
import "../styles/InventoryPage.css";
import { useNavigate } from "react-router-dom";
import iconFilter from "../assets/IconFilter_inventorypage.png";
import iconSearch from "../assets/IconSearch_inventorypage.png";
import { filterInventoryByDate } from "../utils/InventoryUtils";
import { InventoryHook } from "../utils/InventoryHook";

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"thisMonth" | "custom">(
    "thisMonth"
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ambil semua logic dari hook
  const {
    inventoryList,
    newProduct,
    isEditMode,
    handleAddProduct,
    handleUpdateProduct,
    handleDelete,
    setNewProduct,
    handleAddNew,
    handleEditMode,
    setEditingId,
    handleEdit,
  } = InventoryHook();

  // filter + search
  const filteredData =
    filterType === "custom"
      ? filterInventoryByDate(inventoryList, fromDate, toDate)
      : filterInventoryByDate(inventoryList);

  const displayedData = filteredData.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-main">
      {/* Left Side */}
      <div className="inventory-container">
        <div className="inventory-top">
          <div className="inventory-search-filter-group">
            {/* Search */}
            <div className="inventory-search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={iconSearch} alt="search" className="search-icon" />
            </div>

            {/* Filter */}
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

          {/* Buttons */}
          <div className="inventory-action-buttons">
            <button
              className={`btn-new ${!isEditMode ? "active" : ""}`}
              onClick={handleAddNew}
            >
              New Product
            </button>
            <button
              className={`btn-edit ${isEditMode ? "active" : ""}`}
              onClick={handleEditMode}
            >
              Edit Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>ID</th>
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
                  <tr
                    key={item.id}
                    className="hoverable"
                    onClick={() => navigate(`/detailitem/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="inventory-thumb"
                      />
                    </td>
                    <td className="inventory-product-name">
                      {item.productName}
                    </td>
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
                          className="inventory-delete-btn"
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

      {/* Right Side */}
      <div className="manage-inventory">
        <h3>{isEditMode ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={isEditMode ? handleUpdateProduct : handleAddProduct}>
          {isEditMode ? (
            <>
              <label>Select Product</label>
              <select
                value={newProduct.id || ""}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const selected = inventoryList.find(
                    (item) => item.id === selectedId
                  );
                  if (selected) {
                    setNewProduct({ ...selected });
                    setEditingId(selectedId); // ✅ penting! tambahkan ini
                  }
                }}
              >
                <option value="">Select Product</option>
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

          <label>Stock</label>
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
                setNewProduct({ ...newProduct, stock: newProduct.stock + 1 })
              }
            >
              +
            </button>
          </div>

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

          <label>Supplier</label>
          <input
            type="text"
            placeholder="Enter supplier name"
            value={newProduct.supplier}
            onChange={(e) =>
              setNewProduct({ ...newProduct, supplier: e.target.value })
            }
          />

          <label>Description</label>
          <textarea
            placeholder="Enter description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />

          <label>Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
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
