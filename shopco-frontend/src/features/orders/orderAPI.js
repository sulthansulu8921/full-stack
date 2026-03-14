import api from "../../api/axios";

export const checkout = async () => {
  const response = await api.post("/orders/checkout/");
  return response.data;
};
