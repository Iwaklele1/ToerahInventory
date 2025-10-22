import { useState } from "react";
import type { InventoryItem } from "../data/inventoryData";

export function InventoryCUD(
  inventoryList: InventoryItem[],
  setInventoryList: React.Dispatch<React.SetStateAction<InventoryItem[]>>) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<InventoryItem>({
    id: 0,
    productName: "",
    category: "Stocked",
    stock: 0,
    type: "Pcs",
    status: "In Stock",
    supplier: "",
    image: "/images/default.png",
    description: "",
    lastUpdated: new Date().toISOString().split("T")[0],
  });

  // === CREATE ===
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: InventoryItem = {
      ...newProduct,
      id: Math.floor(Math.random() * 9000 + 1000),
      status:
        newProduct.stock <= 0
          ? "Out of Stock"
          : newProduct.stock < 10
          ? "Low Stock"
          : "In Stock",
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setInventoryList([...inventoryList, newItem]);
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
            status:
              newProduct.stock <= 0
                ? "Out of Stock"
                : newProduct.stock < 10
                ? "Low Stock"
                : "In Stock",
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        : item
    );

    setInventoryList(updatedList);
    resetForm();
    setIsEditMode(false);
  };

  // === DELETE ===
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setInventoryList(inventoryList.filter((item) => item.id !== id));
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
      type: "Pcs",
      status: "In Stock",
      supplier: "",
      image: "/images/default.png",
      description: "",
      lastUpdated: new Date().toISOString().split("T")[0],
    });
    setIsEditMode(false);
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
    setIsEditMode,
    handleAddNew,
    handleEditMode,
  };
}
