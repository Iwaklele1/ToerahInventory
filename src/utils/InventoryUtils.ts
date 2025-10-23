// src/utils/InventoryUtils.ts
import type { InventoryItem, StockStatus } from "../data/inventoryData";

/* ============================================================
   🔹 Hitung status stok otomatis berdasarkan kapasitas
   ============================================================ */
export const getStockStatus = (stock: number, capacity: number): StockStatus => {
  if (capacity <= 0) return "Out of Stock";
  const percent = (stock / capacity) * 100;
  if (percent <= 10) return "Out of Stock";
  if (percent < 30) return "Low Stock";
  return "In Stock";
};

/* ============================================================
   🔹 Filter data inventory berdasarkan tanggal
   ============================================================ */
export const filterInventoryByDate = (
  data: InventoryItem[],
  fromDate?: string,
  toDate?: string
): InventoryItem[] => {
  const from = fromDate ? new Date(fromDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const to = toDate ? new Date(toDate) : new Date();

  return data.filter((item) => {
    const updated = new Date(item.lastUpdated);
    return updated >= from && updated <= to;
  });
};

/* ============================================================
   🔹 Hitung ringkasan status stok (buat chart / dashboard)
   ============================================================ */
export const getStockStatusSummary = (data: InventoryItem[]) => {
  const summary = { inStock: 0, lowStock: 0, outOfStock: 0 };
  data.forEach((item) => {
    switch (item.status) {
      case "In Stock":
        summary.inStock++;
        break;
      case "Low Stock":
        summary.lowStock++;
        break;
      case "Out of Stock":
        summary.outOfStock++;
        break;
    }
  });
  return summary;
};

/* ============================================================
   🔹 Ambil data dari Local Storage
   ============================================================ */
const STORAGE_KEY = "inventoryData";

export const getInventoryFromStorage = (): InventoryItem[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return [];
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Error loading inventory data:", error);
    return [];
  }
};

/* ============================================================
   🔹 Simpan data ke Local Storage
   ============================================================ */
export const saveInventoryToStorage = (data: InventoryItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving inventory data:", error);
  }
};
