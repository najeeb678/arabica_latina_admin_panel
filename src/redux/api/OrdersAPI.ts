import api from "@/services/api";

// Get all orders
export const fetchOrders = async () => {
  try {
    const response = await api.get("/orders");
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
};
