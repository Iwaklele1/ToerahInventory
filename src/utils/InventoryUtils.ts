// src/utils/inventoryUtils.ts
// src/utils/inventoryUtils.ts
import type { InventoryItem } from "../data/inventoryData";

// 🔹 Filter data berdasarkan tanggal (range atau default this month)
export const filterInventoryByDate = (
  data: InventoryItem[],
  fromDate?: string,
  toDate?: string
): InventoryItem[] => {
  // ✅ Default: filter bulan ini
  if (!fromDate && !toDate) {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    return data.filter((item) => {
      if (!item.lastUpdated) return false; // jaga-jaga kalau field kosong
      const itemDate = new Date(item.lastUpdated);
      return (
        itemDate.getMonth() === thisMonth && itemDate.getFullYear() === thisYear
      );
    });
  }

  // ✅ Jika ada range tanggal (custom)
  const from = fromDate ? new Date(fromDate) : new Date("1970-01-01");
  const to = toDate ? new Date(toDate) : new Date();

  return data.filter((item) => {
    if (!item.lastUpdated) return false;
    const itemDate = new Date(item.lastUpdated);
    return itemDate >= from && itemDate <= to;
  });
};


// 🔹 Hitung total per status untuk chart
export const getStockStatusSummary = (data: InventoryItem[]) => {
  const summary = {
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  };

  data.forEach((item) => {
    switch (item.status) {
      case "In Stock":
        summary.inStock += 1;
        break;
      case "Low Stock":
        summary.lowStock += 1;
        break;
      case "Out of Stock":
        summary.outOfStock += 1;
        break;
    }
  });

  return summary;
};

