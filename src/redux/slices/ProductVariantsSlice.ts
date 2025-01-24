import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProductVariants, postProductVariant  } from "../api/ProductVariantsApi";

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

// Async Thunk to create a new product variant
export const createProductVariant = createAsyncThunk<
  ProductVariant, // Return type
  {
    productId: string;
    color: string;
    style: string;
    attachment: string;
    isDuotone: boolean;
    size: string;
    stock: number;
    price: number;
  } // Payload type
>(
  "productVariants/createProductVariant",
  async (payload, thunkAPI) => {
    try {
      const data = await postProductVariant(payload);
      return data; // Ensure this matches the `ProductVariant` type
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create product variant");
    }
  }
);


interface ProductVariantsState {
   ProductVariants: any[];
   loading: boolean;
   error: string | null;
   creating: boolean; // For tracking the creation process
  createError: string | null; // For creation errors
}

const initialState: ProductVariantsState = {
   ProductVariants: [],
   loading: false,
   error: null,
   creating: false,
  createError: null,
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
         state.error = action.payload as string || "Failed to fetch product variants";
       })
       // Pending state when creating a product variant
       .addCase(createProductVariant.pending, (state) => {
         state.creating = true;
         state.createError = null;
       })
       // Success state when the creation completes
       .addCase(createProductVariant.fulfilled, (state, action) => {
         state.creating = false;
         state.ProductVariants.push(action.payload); // Add the new product variant to the list
       })
       // Failure state when the creation fails
       .addCase(createProductVariant.rejected, (state, action) => {
         state.creating = false;
         state.createError = action.payload as string || "Failed to create product variant";
       });
   },
 });
 
 export default productsVariantsSlice.reducer;