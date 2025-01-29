import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrders } from "../api/OrdersAPI"; 

// Define initial state
const initialState = {
  orders: [],
  status: "idle", // Can be 'idle', 'loading', 'succeeded', 'failed'
  error: null as string | null | undefined, // Allow error to be a string, null, or undefined
};

// Define asynchronous thunk to fetch orders
export const fetchOrdersAsync = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetchOrders();
  console.log("Fetched orders from API19000:", response);
  return response.data; 
});

// Create slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default ordersSlice.reducer;
