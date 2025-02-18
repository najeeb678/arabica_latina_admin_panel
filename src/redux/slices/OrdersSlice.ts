// redux/ordersSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrders, updateOrderStatus } from "../api/OrdersAPI";

// Define the type for an order
interface Order {
  productId: string;
  orderId: string;
  status: string;
}

// Define initial state
const initialState = {
  orders: [] as Order[],
  status: "idle" as string,
  error: null as string | null | undefined,
};

// Async thunk to fetch orders
export const fetchOrdersAsync = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const response = await fetchOrders();
    console.log("Fetched orders from API:", response);
    return response.data;
  }
);

// Async thunk to update order status
export const updateOrderStatusAsync = createAsyncThunk(
  "orders/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { dispatch, rejectWithValue }
  ) => {
    const response = await updateOrderStatus(orderId, status);

    return response.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      // Update order status

      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        const updatedOrder = action.payload;

        state.orders = state.orders.map((order) =>
          order.orderId === updatedOrder.orderId
            ? {
                ...order,
                status: updatedOrder.status,
                updatedAt: updatedOrder.updatedAt,
              }
            : order
        );
      });
  },
});

export default ordersSlice.reducer;
