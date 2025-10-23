// src/utils/InventoryHook.ts
import { useState, useEffect } from "react";
import type { InventoryItem } from "../data/inventoryData";
import {
  getStockStatus,
  getInventoryFromStorage,
  saveInventoryToStorage,
} from "./InventoryUtils";
import { inventoryData } from "../data/inventoryData";

export function InventoryHook() {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(() => {
    const stored = getInventoryFromStorage();
    if (stored.length > 0) return stored;

    // kalau kosong, pakai data dummy
    const normalized = inventoryData.map((item) => ({
      ...item,
      status: getStockStatus(item.stock, item.capacity),
    }));
    saveInventoryToStorage(normalized);
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

  // 🔹 Sync otomatis ke localStorage setiap kali data berubah
  useEffect(() => {
    saveInventoryToStorage(inventoryList);
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

    const updatedList = [...inventoryList, newItem];
    setInventoryList(updatedList);
    saveInventoryToStorage(updatedList);
    resetForm();
  };

  // === UPDATE ===
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;

    const updatedList = inventoryList.map((item) =>
      item.id === editingId
        ? {
            ...newProduct,
            id: editingId,
            status: getStockStatus(newProduct.stock, newProduct.capacity),
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        : item
    );

    setInventoryList(updatedList);
    saveInventoryToStorage(updatedList); // simpan langsung
    resetForm();
    setIsEditMode(false);
  };

  // === DELETE ===
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    const updated = inventoryList.filter((item) => item.id !== id);
    setInventoryList(updated);
    saveInventoryToStorage(updated);
  };

  // === EDIT ===
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
    editingId, // ✅ tambahkan ini
    setEditingId, // ✅ tambahkan juga ini
  };
}
