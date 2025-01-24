import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProductVariants } from "../api/ProductVariantsApi";

// Async Thunk to fetch product variants
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


interface ProductVariantsState {
   ProductVariants: any[];
   loading: boolean;
   error: string | null;
}

const initialState: ProductVariantsState = {
   ProductVariants: [],
   loading: false,
   error: null,
};

 
 export const productsVariantsSlice = createSlice({
   name: "productsVariants",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       // Pending state when the fetch is in progress
       .addCase(fetchProductVariants.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       // Success state when the fetch completes
       .addCase(fetchProductVariants.fulfilled, (state, action) => {
         state.loading = false;
         state.ProductVariants = action.payload.data; // Assuming the data structure returned is in "data"
       })
       // Failure state when the fetch fails
       .addCase(fetchProductVariants.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload as string || "Failed to fetch product variants"; // Default error message
       });
   },
 });
 
 export default productsVariantsSlice.reducer;