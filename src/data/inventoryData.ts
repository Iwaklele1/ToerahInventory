// src/data/InventoryData.ts
import productImage from "../assets/Rectangle 62.png";

/* ============================================================
   🔹 Type Definitions
   ============================================================ */

export type Category = "Stocked" | "Non-Stocked";
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface InventoryItem {
  id: number;
  productName: string;
  category: Category;
  stock: number;
  capacity: number;
  type: string;
  supplier: string;
  image: string;
  description: string;
  lastUpdated: string;
  status: "In Stock" | "Low Stock" | "Out of Stock"; // wajib ada
}

/* ============================================================
   🔹 Initial Dummy Data
   ============================================================ */

export const inventoryData: Omit<InventoryItem, "status">[] = [
  {
    id: 1001,
    productName: "Coffee Gayo",
    category: "Stocked",
    stock: 260,
    capacity: 5000,
    type: "pcs",
    supplier: "Gayo Beans Supplier",
    image: productImage,
    description:
      "Premium Arabica beans from Gayo Highlands. Full body with mild acidity.",
    lastUpdated: "2025-10-21",
  },
  {
    id: 2001,
    productName: "Grinder",
    category: "Non-Stocked",
    stock: 1,
    capacity: 2,
    type: "pcs",
    supplier: "GrindMaster Co.",
    image: productImage,
    description:
      "High precision grinder for consistent particle size distribution.",
    lastUpdated: "2025-10-05",
  },
  {
    id: 1002,
    productName: "Diamond Milk",
    category: "Stocked",
    stock: 500,
    capacity: 1000,
    type: "pcs",
    supplier: "Fresh Dairy Indonesia",
    image: productImage,
    description: "High quality milk for premium coffee blends.",
    lastUpdated: "2025-09-28",
  },
  {
    id: 1003,
    productName: "Coffee Toraja",
    category: "Stocked",
    stock: 1200,
    capacity: 4000,
    type: "pcs",
    supplier: "Toraja Coffee Traders",
    image: productImage,
    description:
      "Strong and earthy flavor profile, perfect for traditional brews.",
    lastUpdated: "2025-09-14",
  },
  {
    id: 1004,
    productName: "Espresso Machine",
    category: "Non-Stocked",
    stock: 3,
    capacity: 3,
    type: "pcs",
    supplier: "Barista Tools Ltd",
    image: productImage,
    description:
      "Professional espresso machine with precise temperature control.",
    lastUpdated: "2025-08-30",
  },
  {
    id: 1005,
    productName: "Coffee Filter Paper",
    category: "Stocked",
    stock: 0,
    capacity: 1000,
    type: "pcs",
    supplier: "Clean Brew Supplies",
    image: productImage,
    description:
      "Premium paper filters ensuring consistent flow and clarity in every brew.",
    lastUpdated: "2025-07-02",
  },
  {
    id: 1006,
    productName: "Robusta Lampung",
    category: "Stocked",
    stock: 800,
    capacity: 1500,
    type: "pcs",
    supplier: "Lampung Coffee Farmers",
    image: productImage,
    description: "Strong and bold Robusta beans from Lampung region.",
    lastUpdated: "2025-06-10",
  },
  {
    id: 1007,
    productName: "Coffee Scoop",
    category: "Non-Stocked",
    stock: 15,
    capacity: 20,
    type: "pcs",
    supplier: "Barista Tools Ltd",
    image: productImage,
    description: "Durable stainless steel scoop for accurate measurement.",
    lastUpdated: "2025-05-25",
  },
  {
    id: 1008,
    productName: "Coffee Bali Kintamani",
    category: "Stocked",
    stock: 1400,
    capacity: 5000,
    type: "pcs",
    supplier: "Kintamani Collective",
    image: productImage,
    description: "Fruity and aromatic Arabica from Bali highlands.",
    lastUpdated: "2025-04-08",
  },
  {
    id: 1009,
    productName: "Paper Cup 12oz",
    category: "Non-Stocked",
    stock: 0,
    capacity: 50,
    type: "pcs",
    supplier: "EcoServe Indonesia",
    image: productImage,
    description: "Biodegradable paper cups for hot and cold drinks.",
    lastUpdated: "2025-03-18",
  },
  {
    id: 1010,
    productName: "Coffee Mug",
    category: "Non-Stocked",
    stock: 20,
    capacity: 25,
    type: "pcs",
    supplier: "Coffee Gear ID",
    image: productImage,
    description: "Ceramic mugs for daily brewing.",
    lastUpdated: "2025-02-10",
  },
  {
    id: 1011,
    productName: "Coffee Mandheling",
    category: "Stocked",
    stock: 600,
    capacity: 1000,
    type: "pcs",
    supplier: "Mandheling Co.",
    image: productImage,
    description:
      "Full-bodied coffee with complex flavor from North Sumatra highlands.",
    lastUpdated: "2025-01-17",
  },
  {
    id: 1012,
    productName: "Espresso Beans",
    category: "Stocked",
    stock: 1500,
    capacity: 2000,
    type: "pcs",
    supplier: "Java Coffee Supply",
    image: productImage,
    description:
      "Rich espresso roast beans with chocolate and caramel undertones.",
    lastUpdated: "2025-10-08",
  },
  {
    id: 2002,
    productName: "Coffee Scale",
    category: "Non-Stocked",
    stock: 5,
    capacity: 10,
    type: "pcs",
    supplier: "Barista Tools Co.",
    image: productImage,
    description:
      "Precision digital scale for measuring coffee and water ratios.",
    lastUpdated: "2025-10-08",
  },
  {
    id: 1013,
    productName: "Brown Sugar Syrup",
    category: "Stocked",
    stock: 250,
    capacity: 1000,
    type: "pcs",
    supplier: "SweetBrew Indonesia",
    image: productImage,
    description:
      "Sweet brown sugar syrup for flavored iced or hot coffee drinks.",
    lastUpdated: "2025-10-08",
  },
  {
    id: 1014,
    productName: "Paper Cups 12oz",
    category: "Stocked",
    stock: 200,
    capacity: 2500,
    type: "pcs",
    supplier: "EcoPack Supplies",
    image: productImage,
    description:
      "Eco-friendly paper cups for hot beverages, biodegradable and sturdy.",
    lastUpdated: "2025-10-08",
  },
  {
    id: 2003,
    productName: "Coffee Filter Machine",
    category: "Non-Stocked",
    stock: 1,
    capacity: 3,
    type: "pcs",
    supplier: "TechBrew Systems",
    image: productImage,
    description:
      "Automatic coffee filter machine with precise temperature control.",
    lastUpdated: "2025-10-08",
  },
];
