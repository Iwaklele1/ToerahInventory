// src/utils/InventoryHook.ts
import { useState, useEffect } from "react";
import type { InventoryItem } from "../data/inventoryData";
import { getStockStatus } from "./InventoryUtils";
import { inventoryData } from "../data/inventoryData";

// === Local Storage Key ===
const STORAGE_KEY = "inventoryData";

// === Helpers ===
const saveToStorage = (data: InventoryItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadFromStorage = (): InventoryItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// === HOOK utama ===
export function InventoryHook() {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(() => {
    // Saat pertama kali load: ambil dari localStorage
    const stored = localStorage.getItem("inventoryData");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        console.error("Invalid data in storage, fallback to dummy");
      }
    }

    // Kalau gak ada data, ambil dari dummy dan hitung status
    const normalized = inventoryData.map((item) => ({
      ...item,
      status: getStockStatus(item.stock, item.capacity),
    }));

    localStorage.setItem("inventoryData", JSON.stringify(normalized));
    return normalized;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<InventoryItem>({
    id: 0,
    productName: "",
    category: "Stocked",
    stock: 0,
    capacity: 100,
    type: "Pcs",
    status: "In Stock",
    supplier: "",
    image: "/images/default.png",
    description: "",
    lastUpdated: new Date().toISOString().split("T")[0],
  });

  // 🔹 Simpan otomatis ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem("inventoryData", JSON.stringify(inventoryList));
  }, [inventoryList]);

  // === CREATE ===
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      ...newProduct,
      id: Math.floor(Math.random() * 9000 + 1000),
      status: getStockStatus(newProduct.stock, newProduct.capacity),
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setInventoryList((prev) => [...prev, newItem]);
    resetForm();
  };

  // === UPDATE ===
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    const updated = inventoryList.map((item) =>
      item.id === editingId
        ? {
            ...newProduct,
            id: editingId,
            status: getStockStatus(newProduct.stock, newProduct.capacity),
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        : item
    );
    setInventoryList(updated);
    saveToStorage(updated)
    resetForm();
    setIsEditMode(false);
  };

  // === DELETE ===
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setInventoryList((prev) => prev.filter((item) => item.id !== id));
  };

  // === EDIT MODE ===
  const handleEdit = (item: InventoryItem) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setNewProduct(item);
  };

  // === RESET FORM ===
  const resetForm = () => {
    setNewProduct({
      id: 0,
      productName: "",
      category: "Stocked",
      stock: 0,
      capacity: 100,
      type: "Pcs",
      status: "In Stock",
      supplier: "",
      image: "/images/default.png",
      description: "",
      lastUpdated: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
  };

  // === TOGGLE ===
  const handleAddNew = () => setIsEditMode(false);
  const handleEditMode = () => setIsEditMode(true);

  return {
    inventoryList,
    newProduct,
    isEditMode,
    handleAddProduct,
    handleUpdateProduct,
    handleDelete,
    handleEdit,
    setNewProduct,
    handleAddNew,
    handleEditMode,
  };
}
