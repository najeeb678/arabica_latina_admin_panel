import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Customers as CustomersType } from "@/types/types";
import { getCustomers } from "../api/CustomersAPI";


// Fetch customers async thunk
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await getCustomers();
    return response.data;
  }
);


interface CustomersState {
  customers: CustomersType[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CustomersState = {
  customers: [],
  status: "idle",
  error: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default customersSlice.reducer;
