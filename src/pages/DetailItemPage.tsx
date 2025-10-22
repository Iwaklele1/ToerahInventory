import React, { useState } from "react";
import "../styles/DetailItemPage.css";

// Icon hasil export dari Figma
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
import iconStcok from "../assets/IconStockedProduct_detailitem.png";
import productImage from "../assets/Rectangle 62.png";

const DetailItemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"vendors" | "history">("vendors");
  const [showSearch, setShowSearch] = useState(false);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showCreateVendorModal, setShowCreateVendorModal] = useState(false);

  const handleAddVendor = () => {
    setShowAddVendorModal(true);
  };

  const handleCreateVendor = () => {
    setShowAddVendorModal(false);
    setShowCreateVendorModal(true);
  };

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="detail-page-container">
      {/*SIDEBAR*/}
      <div className="sidebar">
        <div className="sidebar-header">
          {!showSearch ? (
            <>
              {/* Tombol kiri - Search */}
              <button className="icon-btn left" onClick={handleToggleSearch}>
                <img src={searchIcon} alt="search" className="icon-search" />
              </button>

              {/* Tombol kanan - Add & Edit */}
              <div className="right-icons">
                <button className="icon-btn">
                  <img src={plusIcon} alt="add" className="icon-plus" />
                </button>
                <button className="icon-btn">
                  <img src={editIcon} alt="edit" className="icon-edit" />
                </button>
              </div>
            </>
          ) : (
            // Mode Search Aktif
            <div className="search-bar active">
              <input type="text" placeholder="Search product..." autoFocus />
              <button className="delete" onClick={handleToggleSearch}>
                <img src={DeleteIcon} alt="delete" className="icon-delete" />
              </button>
            </div>
          )}
        </div>

        {/* Daftar Produk di Sidebar */}
        <div className="product-list">
          <h4><b>Product List</b></h4>
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="product-item" key={item}>
              <div className="product-thumb">
                <img src={productImage} alt="Product" />
              </div>
              <div className="product-info-mini">
                <p className="product-title">Coffee Gayo</p>
                <span className="product-id">#10000{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="detail-content">
        <div className="detail-header">
          <button className="close-btn">
            <img src={closeIcon} alt="close" className="icon-close" />
          </button>
          <h3>The Bloom Coffee - Sakura 1 Pack 10 Gr</h3>
        </div>

        <div className="detail-body">
          <img src={productImage} alt="Product" className="product-image" />

          <div className="product-info">
            <p className="product-desc">
              Kopi premium dalam kemasan praktis sekali seduh yang menghadirkan aroma floral lembut
              dengan aftertaste manis khas bunga sakura. Diproses dari biji pilihan dan dikemas
              kedap udara, cocok untuk penikmat keseimbangan rasa elegan dalam setiap cangkir.
            </p>

            <div className="product-details">
              <div className="detail-item">
                <img src={iconID} alt="ID Icon" className="icon-id" />
                <span className="value">100001</span>
              </div>

                <div className="detail-item">
                <img src={iconCeklis} alt="Checklist Icon" className="icon-checklist" />
                <span className="value">
                  <span className="detail-item status low">Low Stock</span>
                </span>
              </div>

              <div className="detail-item">
                <img src={iconStcok} alt="Stock Icon" className="icon-stocked" />
                <span className="label">Stocked Product</span>
              </div>

              <div className="detail-item">
                <img src={iconProduct} alt="Product Icon" className="icon-product" />
                <span className="label">100 Kg</span>
                <span className="value"></span>
              </div>
            </div>
          </div>
          </div>


      <div className="tabs-container">
  <div className="tabs">
    <button
      className={`tab-button ${activeTab === "vendors" ? "active" : ""}`}
      onClick={() => setActiveTab("vendors")}
    >
      <img src={userIcon} alt="vendors" className="icon-tab" />
      Product Vendors
    </button>

    <button
      className={`tab-button ${activeTab === "history" ? "active" : ""}`}
      onClick={() => setActiveTab("history")}
    >
      <img src={timeIcon} alt="history" className="icon-tab" />
      Order History
    </button>
  </div>
</div>

        {/* Table Section */}
        {activeTab === "vendors" ? (
          <div className="table-container fade-in">
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Vendor Link</th>
                  <th>Vendor Product Code</th>
                  <th>Lead Time</th>
                  <th>Vendor Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cuisine Supply Inc.</td>
                  <td>https://cuisine.supply.co</td>
                  <td>240001</td>
                  <td>10 Days</td>
                  <td>Rp.100.000,00</td>
                </tr>
                <tr>
                  <td>Bloom Roastery</td>
                  <td>https://bloomroast.id</td>
                  <td>240002</td>
                  <td>8 Days</td>
                  <td>Rp.98.000,00</td>
                </tr>
              </tbody>
            </table>
            <button className="add-vendor-btn" onClick={handleAddVendor}>
              + Add Vendor
            </button>
          </div>
        ) : (
          <div className="table-container fade-in">
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

{showAddVendorModal && (
  <div className="modal-overlay">
    <div className="modal add-vendor-modal">
      <h3>Add vendor to product</h3>

      {/* Search bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <img src={searchIcon} alt="search" className="icon-search-modal" />
      </div>

      {/* Vendor list */}
      <div className="vendor-list">
        {[1, 2, 3].map((item) => (
          <div className="vendor-item" key={item}>
            <div className="vendor-info">
              <img src={userIcon} alt="vendor" className="icon-user-modal" />
              <div className="vendor-text">
                <span className="vendor-name">Product Vendor</span>
                <span className="vendor-link">(Vendor Link Optional)</span>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* Footer buttons */}
      <div className="modal-footer">
        <button
          className="create-new-btn"
          onClick={() => {
            setShowAddVendorModal(false);
            setShowCreateVendorModal(true);
          }}
        >
          ＋ Create new vendor
        </button>
        <button
          className="cancel-btn"
          onClick={() => setShowAddVendorModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* ================= MODAL CREATE VENDOR ================= */}
{showCreateVendorModal && (
  <div className="modal-overlay">
    <div className="modal create-vendor-modal">
      <h3>Create a new vendor</h3>

      <div className="form-group">
        <label htmlFor="vendorName">Vendor name</label>
        <input
          id="vendorName"
          type="text"
          placeholder="Enter vendor name"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="vendorLink">Vendor link (optional)</label>
        <input
          id="vendorLink"
          type="text"
          placeholder="Enter vendor link"
          className="input-field"
        />
      </div>

      <div className="modal-actions">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowCreateVendorModal(false);
            setShowAddVendorModal(true);
          }}
        >
          Cancel
        </button>
        <button className="create-btn">Create</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default DetailItemPage;
