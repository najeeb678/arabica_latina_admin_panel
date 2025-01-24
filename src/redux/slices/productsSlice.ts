import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductApi, getAllProductsApi } from "../api/productsApi";

export const getAllProducts = createAsyncThunk<
  any,
  { search?: string; filter?: string } | any
>("products/getAllProducts", async (filters, { rejectWithValue }) => {
  try {
    const data = await getAllProductsApi(filters);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await addProductApi(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching slots");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsData: <any>[],
    loadingproductsData: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loadingproductsData = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.loadingproductsData = false;
        state.productsData = action.payload.data;
      })
      .addCase(addProduct.fulfilled, (state, action) => {});
  },
});

export default productsSlice.reducer;
