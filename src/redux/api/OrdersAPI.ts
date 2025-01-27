import api from "@/services/api";

////Get all orders
export const fetchOrders = async () => {
  const response = await api.get("/orders/user");
  return response.data;
};