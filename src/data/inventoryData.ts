// src/data/inventoryData.ts
import productImage from "../assets/Rectangle 62.png";


export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type Category = "Stocked" | "Non-Stocked";

export interface InventoryItem {
  id: number; // 4-digit ID
  productName: string;
  category: Category;
  stock: number;
  status: StockStatus;
  supplier: string;
  image: string;
  description: string;
  lastUpdated: string; // ISO date string (ex: "2025-03-10")
}

// ✅ Dummy data sementara
export const inventoryData: InventoryItem[] = [
  {
    id: 1001,
    productName: "Coffee Gayo",
    category: "Stocked",
    stock: 2860,
    status: "Low Stock",
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
    stock: 0,
    status: "Out of Stock",
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
    status: "In Stock",
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
    status: "Low Stock",
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
    status: "In Stock",
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
    status: "Out of Stock",
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
    status: "In Stock",
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
    status: "In Stock",
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
    status: "Low Stock",
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
    status: "Out of Stock",
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
    status: "In Stock",
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
    status: "In Stock",
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
    status: "In Stock",
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
    status: "Low Stock",
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
    status: "Low Stock",
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
    stock: 1200,
    status: "In Stock",
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
    status: "Out of Stock",
    supplier: "TechBrew Systems",
    image: productImage,
    description:
      "Automatic coffee filter machine with precise temperature control.",
    lastUpdated: "2025-10-08",
  },
];
