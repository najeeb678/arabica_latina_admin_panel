// redux/ordersSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, updateOrderStatus } from '../api/OrdersAPI';

// Define the type for an order
interface Order {
  productId: string;
  orderId: string;
  status: string;
}

// Define initial state
const initialState = {
  orders: [] as Order[],
  status: 'idle' as string,
  error: null as string | null | undefined,
};

// Async thunk to fetch orders
export const fetchOrdersAsync = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetchOrders();
  console.log('Fetched orders from API:', response);
  return response.data; 
});

// Async thunk to update order status
export const updateOrderStatusAsync = createAsyncThunk(
  'orders/updateOrderStatus',
  async (
    { orderId, status }: { orderId: string; status: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      console.log("res in slice",response);
      if (!response.data) {
        return rejectWithValue('No data returned for updated order');
      }

      // Dispatch fetchOrdersAsync after updating the status
      // await dispatch(fetchOrdersAsync());
      return response.data;
    } catch (error) {
      return rejectWithValue('Error updating order status');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })

      // Update order status
      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        console.log("action", action.payload)
        state.status = 'succeeded';
        const updatedOrder = action.payload;
        // console.log('Successfully updated order:', state.meta.arg);

        // Update the orders array with the updated order
        state.orders = state.orders.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatusAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Failed to update order:', action.payload);
      });
  },
});

export default ordersSlice.reducer;
