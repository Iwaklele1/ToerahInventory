// src/utils/InventoryHook.ts
import { useState, useEffect } from "react";
import type { InventoryItem } from "../data/inventoryData";
import { sendTelegramNotification } from "./TelegramUtils";

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

  useEffect(() => {
    saveInventoryToStorage(inventoryList);
  }, [inventoryList]);

  const getLoggedUser = () => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return { username: "Unknown", role: "unknown", telegramId: "" };
      const u = JSON.parse(stored);
      return {
        username: u.username || u.name || u.role || "Unknown",
        role: u.role || "user",
        telegramId: u.telegramId || "",
      };
    } catch {
      return { username: "Unknown", role: "unknown", telegramId: "" };
    }
  };

  // === CREATE ===
  const handleAddProduct = async (e: React.FormEvent) => {
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
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;

    const oldItem = inventoryList.find((item) => item.id === editingId);
    if (!oldItem) return;

    const updatedItem: InventoryItem = {
      ...newProduct,
      id: editingId,
      status: getStockStatus(newProduct.stock, newProduct.capacity),
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    const updatedList = inventoryList.map((item) =>
      item.id === editingId ? updatedItem : item
    );

    setInventoryList(updatedList);
    saveInventoryToStorage(updatedList);

    // detect changes
    const changes: string[] = [];

    if (oldItem.productName !== updatedItem.productName)
      changes.push(`🧾 Nama: "${oldItem.productName}" → "${updatedItem.productName}"`);
    if (oldItem.stock !== updatedItem.stock)
      changes.push(`📊 Stok: ${oldItem.stock} → ${updatedItem.stock}`);
    if (oldItem.capacity !== updatedItem.capacity)
      changes.push(`📦 Capacity: ${oldItem.capacity} → ${updatedItem.capacity}`);
    if (oldItem.type !== updatedItem.type)
      changes.push(`🔖 Unit Type: ${oldItem.type} → ${updatedItem.type}`);
    if (oldItem.category !== updatedItem.category)
      changes.push(`🏷️ Kategori: ${oldItem.category} → ${updatedItem.category}`);
    if ((oldItem.supplier || "").trim() !== (updatedItem.supplier || "").trim())
      changes.push(`🚚 Supplier: "${oldItem.supplier || "-"}" → "${updatedItem.supplier || "-"}"`);
    if ((oldItem.description || "").trim() !== (updatedItem.description || "").trim())
      changes.push(`📝 Deskripsi: diubah`);
    if (oldItem.image !== updatedItem.image)
      changes.push(`🖼️ Gambar: diubah`);
    if (oldItem.status !== updatedItem.status)
      changes.push(`⚠️ Status stok: ${oldItem.status} → ${updatedItem.status}`);



    resetForm();
    setIsEditMode(false);
  };

  // === DELETE ===
  // NOTE: modal delete di UI akan handle konfirmasi, jadi di hook kita tidak memanggil window.confirm()
  const handleDelete = async (id: number) => {
    const deletedItem = inventoryList.find((i) => i.id === id);
    const updated = inventoryList.filter((item) => item.id !== id);
    setInventoryList(updated);
    saveInventoryToStorage(updated);

    if (deletedItem) {
      const user = getLoggedUser();
      const message = `🗑️ <b>${escapeHtml(user.username)}</b> menghapus produk: <b>${escapeHtml(deletedItem.productName)}</b>\n` +
                      `<b>Tanggal:</b> ${new Date().toISOString().split("T")[0]}`;
      await safeSendNotification(message);
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setNewProduct(item);
  };

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
    editingId,
    setEditingId,
    resetForm,
  };
}

/* helpers */

function escapeHtml(str: string) {
  if (str === null || typeof str === "undefined") return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function safeSendNotification(message: string) {
  try {
    await sendTelegramNotification(message);
  } catch (err) {
    console.error("sendTelegramNotification failed:", err);
  }
}
