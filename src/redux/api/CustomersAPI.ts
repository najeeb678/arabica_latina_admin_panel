import api from "@/services/api";

////Get all customers
export const getCustomers = async () => {
  const response = await api.get("/orders/getAllCustomersWithOrders");
  console.log("Cusomers2132: ", response)
  return response.data;
};