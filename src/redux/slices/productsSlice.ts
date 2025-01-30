import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductApi, getAllProductsApi, updateProductApi, deleteProductApi  } from "../api/productsApi";

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
      return rejectWithValue(error.response?.data || "Error adding product");
    }
  }
);

// Update product action
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await updateProductApi(id, data);
      return { id, updatedData: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error updating product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteProductApi(id);
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting product");
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
        console.log("Fetched products:", action.payload);
        state.loadingproductsData = false;
        state.productsData = action.payload.data;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log("Product added:", action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log("Product updated:", action.payload);
        const { id, updatedData } = action.payload;
        state.productsData = state.productsData.map((product: any) =>
          product.productId === id ? { ...product, ...updatedData } : product
        );
      })
      // Handle product deletion
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log("Product deleted:", action.payload);
        const deletedProductId = action.payload;
        state.productsData = state.productsData.filter(
          (product: any) => product.productId !== deletedProductId
        );
      });
  },
});

export default productsSlice.reducer;