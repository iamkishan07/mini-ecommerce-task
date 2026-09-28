import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET PRODUCTS
  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products");

      console.log("Products Response:", response.data);

      setProducts(response.data.products || []);
    } catch (error) {
      console.error(
        "Get Products Error:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // CREATE PRODUCT
  const createProduct = async (productData) => {
    try {
      console.log("Creating Product...");
      console.log("FormData:", productData);

      const response = await api.post("/products/create", productData);

      console.log("Create Product Response:", response.data);

      const newProduct = response.data.product;

      if (newProduct) {
        setProducts((prev) => [...prev, newProduct]);
      }

      return response.data;
    } catch (error) {
      console.error(
        "Create Product Error:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, productData) => {
    try {
      console.log("Updating Product:", id);

      const response = await api.put(`/products/${id}`, productData);

      console.log("Update Product Response:", response.data);

      const updatedProduct = response.data.product;

      if (updatedProduct) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === id ? updatedProduct : product,
          ),
        );
      }

      return response.data;
    } catch (error) {
      console.error(
        "Update Product Error:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      console.log("Deleting Product:", id);

      const response = await api.delete(`/products/${id}`);

      console.log("Delete Product Response:", response.data);

      setProducts((prev) => prev.filter((product) => product._id !== id));

      return response.data;
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // LOAD PRODUCTS
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
