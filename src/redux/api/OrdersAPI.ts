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

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await api.post("/orders/updateOrderStatus", {
    orderId,
    status,
  });

  return response.data;
};
