import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProductVariants, postProductVariant, deleteProductVariantAPI } from "../api/ProductVariantsApi";

export const fetchProductVariants = createAsyncThunk(
   "productVariants/fetchProductVariants", 
   async (_, thunkAPI) => {
      try {
         const data = await getProductVariants();
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.message || "Failed to fetch product variants");
      }
   }
);

export const createProductVariant = createAsyncThunk< 
  ProductVariant, 
  {
    productId: string;
    color: string;
    style: string;
    attachment: string;
    isDuotone: boolean;
    size: string;
    stock: number;
    price: number;
  }
>(
  "productVariants/createProductVariant",
  async (payload, thunkAPI) => {
    try {
      const data = await postProductVariant(payload);
      return data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create product variant");
    }
  }
);

export const deleteProductVariant = createAsyncThunk(
  "productVariants/deleteProductVariant",
  async (variantId: string, thunkAPI) => {
    try {
      await deleteProductVariantAPI(variantId); 
      return variantId; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to delete product variant");
    }
  }
);


interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  style: string;
  attachment: string;
  isDuotone: boolean;
  size: string;
  stock: number;
  price: number;
}

interface ProductVariantsState {
  ProductVariants: ProductVariant[];
  loading: boolean;
  error: string | null;
  creating: boolean; 
  createError: string | null; 
  deleting: boolean;
  deleteError: string | null;
}

const initialState: ProductVariantsState = {
  ProductVariants: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
  deleting: false,
  deleteError: null,
};

export const productsVariantsSlice = createSlice({
  name: "productsVariants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProductVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.ProductVariants = action.payload.data; 
      })
      .addCase(fetchProductVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch product variants";
      })
      
      
      .addCase(createProductVariant.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createProductVariant.fulfilled, (state, action) => {
        state.creating = false;
        state.ProductVariants.push(action.payload); 
      })
      .addCase(createProductVariant.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload as string || "Failed to create product variant";
      })
      
      // Delete Product Variant
      .addCase(deleteProductVariant.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProductVariant.fulfilled, (state, action) => {
        state.deleting = false;
        // Remove the product variant with the given id from the state
        state.ProductVariants = state.ProductVariants.filter(
          (variant) => variant.id !== action.payload
        );
      })
      .addCase(deleteProductVariant.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload as string || "Failed to delete product variant";
      });
  },
});

export default productsVariantsSlice.reducer;
