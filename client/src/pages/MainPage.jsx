import React, { useContext, useState } from "react";
import ItemCard from "../components/ItemCard";
import ItemForm from "../components/ItemForm";
import { ProductContext } from "../context/ProductContext";

const MainPage = () => {
  const { products, createProduct, updateProduct, deleteProduct } =
    useContext(ProductContext);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const addItem = async (productData) => {
    try {
      await createProduct(productData);
      setShowForm(false);
    } catch (error) {
      console.log("Add Product Error:", error);
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const updateItem = async (id, productData) => {
    try {
      await updateProduct(id, productData);
      setEditingItem(null);
      setShowForm(false);
    } catch (error) {
      console.log("Update Product Error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log("Delete Product Error:", error);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">My Collection</h1>

            <p className="text-gray-500 mt-1">Manage your products easily.</p>
          </div>

          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="px-5 py-3 bg-lime-400 text-black rounded-lg font-semibold hover:bg-lime-300 transition"
          >
            + Add Product
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={editItem}
              onDelete={deleteItem}
            />
          ))}
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <ItemForm
          item={editingItem}
          onAdd={addItem}
          onUpdate={updateItem}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default MainPage;
