import api from "../../api/axios";

export const fetchProducts = async (filters = {}) => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v != null && v !== "")
  );
  const params = new URLSearchParams(cleanFilters).toString();
  const response = await api.get(`/products/?${params}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/products/", productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}/`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}/`);
  return response.data;
};
