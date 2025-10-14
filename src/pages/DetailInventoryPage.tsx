import React, { useState } from "react";
import "../styles/DetailInventoryPage.css";
import { FaSearch, FaFilter, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewProductPage = () => {
  const userRole = "admin"; // ubah ke "admin" untuk tes delete

  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("thisMonth");
  const [showCustom, setShowCustom] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [inventoryData, setInventoryData] = useState([
    {
      id: "100001",
      name: "Coffee Gayo",
      category: "Stocked",
      status: "Low Stock",
      stock: 100,
      type: "Kg",
      supplier: "Vendor A",
    },
    {
      id: "200001",
      name: "Grinder",
      category: "Non-Stocked",
      status: "Out Of Stock",
      stock: 2,
      type: "Pcs",
      supplier: "Vendor B",
    },
    {
      id: "300001",
      name: "Diamond Milk",
      category: "Stocked",
      status: "In Stock",
      stock: 100,
      type: "L",
      supplier: "Vendor C",
    },
  ]);

  const navigate = useNavigate();

  const handleAddNew = () => setIsEditMode(false);
  const handleEdit = () => setIsEditMode(true);

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    category: "Stocked",
    type: "Kg",
    vendor: "",
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Math.floor(Math.random() * 900000 + 100000).toString(),
      name: newProduct.name || "Unnamed Product",
      category: newProduct.category,
      status:
        newProduct.quantity <= 0
          ? "Out Of Stock"
          : newProduct.quantity < 10
          ? "Low Stock"
          : "In Stock",
      stock: newProduct.quantity,
      type: newProduct.type,
      supplier: newProduct.vendor || "-",
    };
    setInventoryData([...inventoryData, newItem]);
    setNewProduct({
      name: "",
      quantity: 0,
      category: "Stocked",
      type: "Kg",
      vendor: "",
    });
  };

  const handleDelete = (id: string) => {
    if (userRole !== "admin") {
      alert("Only admin can delete data!");
      return;
    }
    setInventoryData(inventoryData.filter((item) => item.id !== id));
  };

  const filteredData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-main">
      {/* ===== LEFT SIDE ===== */}
      <div className="inventory-container">
        {/* ===== TOP BAR ===== */}
        <div className="inventory-top">
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

            <button
              className={`filter-btn ${showFilter ? "active" : ""}`}
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaFilter />
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
                  This Month
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

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className={`btn-new ${!isEditMode ? "active" : ""}`}
              onClick={handleAddNew}
            >
              New Product
            </button>
            <button
              className={`btn-edit ${isEditMode ? "active" : ""}`}
              onClick={handleEdit}
            >
              Edit Product
            </button>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Category</th>
              <th>Status</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Supplier</th>
              {userRole === "admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>
                  <span
                    className={`status ${item.status
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.stock}</td>
                <td>{item.type}</td>
                <td>{item.supplier}</td>
                {userRole === "admin" && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== RIGHT SIDE ===== */}
      <div className="manage-inventory">
        <h3>{isEditMode ? "Manage Inventory" : "Add Item"}</h3>

        <form onSubmit={handleAddProduct}>
          {isEditMode ? (
            <>
              <label>Select Product ID</label>
              <select>
                {inventoryData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id} - {item.name}
                  </option>
                ))}
              </select>

              <label>Enter Quantity To Add</label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setNewProduct({
                      ...newProduct,
                      quantity: Math.max(0, newProduct.quantity - 1),
                    })
                  }
                >
                  -
                </button>
                <span>{newProduct.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setNewProduct({
                      ...newProduct,
                      quantity: newProduct.quantity + 1,
                    })
                  }
                >
                  +
                </button>
              </div>

              <label>Select Product Category</label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option>Stocked</option>
                <option>Non-Stocked</option>
              </select>

              <label>Select Product Type</label>
              <select
                value={newProduct.type}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, type: e.target.value })
                }
              >
                <option>Kg</option>
                <option>Pcs</option>
                <option>L</option>
              </select>

              <label>Enter Vendor Name</label>
              <input
                type="text"
                placeholder="Enter vendor name"
                value={newProduct.vendor}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, vendor: e.target.value })
                }
              />

              <button type="submit">Submit</button>
            </>
          ) : (
            <>
              <label>Enter Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />

              <label>Enter Quantity To Add</label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setNewProduct({
                      ...newProduct,
                      quantity: Math.max(0, newProduct.quantity - 1),
                    })
                  }
                >
                  -
                </button>
                <span>{newProduct.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setNewProduct({
                      ...newProduct,
                      quantity: newProduct.quantity + 1,
                    })
                  }
                >
                  +
                </button>
              </div>

              <label>Select Product Category</label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option>Stocked</option>
                <option>Non-Stocked</option>
              </select>

              <label>Select Product Type</label>
              <select
                value={newProduct.type}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, type: e.target.value })
                }
              >
                <option>Kg</option>
                <option>Pcs</option>
                <option>L</option>
              </select>

              <label>Enter Vendor Name</label>
              <input
                type="text"
                placeholder="Enter vendor name"
                value={newProduct.vendor}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, vendor: e.target.value })
                }
              />

              <button type="submit">Add</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewProductPage;
