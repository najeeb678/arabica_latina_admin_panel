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
  try {
   console.log("orderId: ", orderId, "status: ", status);  // for testing purpose
    const response = await api.post("/orders/updateOrderStatus", { orderId, status });
    
     console.log("res in api",response.data);  // for testing purpose
    return response.data;
  } catch (error) {
    console.error("Error updating order status", error);
  }
};