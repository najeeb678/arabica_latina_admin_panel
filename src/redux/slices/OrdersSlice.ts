import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders } from '../api/OrdersAPI'; 

// Define a type for the order object
interface Order {
  id: string;
  product: string;
  quantity: number;
  price: number;
  // Add other fields as needed
}

interface OrdersState {
  data: Order[];
  loading: boolean;
  error: string | null;
}

// Define the initial state of the orders
const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk to fetch orders using the getOrders function from OrdersAPI.ts
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchOrders(); // Call the imported getOrders function
      return response; // Return the fetched data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message); // Handle error response
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  }
});


export default ordersSlice.reducer;
