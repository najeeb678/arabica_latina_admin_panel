import api from "@/services/api";

export const getCustomers = async () => {
  const response = await api.get("/orders/getAllCustomersWithOrders");

  return response.data;
};
