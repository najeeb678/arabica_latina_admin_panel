import api from "@/services/api";

////Get all orders
export const fetchOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};