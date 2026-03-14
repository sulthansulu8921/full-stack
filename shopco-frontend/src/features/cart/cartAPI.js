import api from "../../api/axios";

export const fetchCart = async () => {
  const response = await api.get("/cart/");
  return response.data;
};

export const addToCartAPI = async (productId) => {
  const response = await api.post("/cart/", { product_id: productId });
  return response.data;
};

export const updateCartAPI = async (productId, quantity) => {
  const response = await api.put("/cart/update/", { product_id: productId, quantity });
  return response.data;
};

export const removeFromCartAPI = async (productId) => {
  const response = await api.delete("/cart/remove/", { data: { product_id: productId } });
  return response.data;
};
