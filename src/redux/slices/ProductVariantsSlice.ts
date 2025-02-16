import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProductVariants,
  postProductVariant,
  deleteProductVariantAPI,
  updateProductVariantAPI,
} from "../api/ProductVariantsApi";

export const fetchProductVariants = createAsyncThunk(
  "productVariants/fetchProductVariants",
  async (_, thunkAPI) => {
    try {
      const data = await getProductVariants();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch product variants"
      );
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
>("productVariants/createProductVariant", async (payload, thunkAPI) => {
  try {
    const data = await postProductVariant(payload);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Failed to create product variant"
    );
  }
});

export const deleteProductVariant = createAsyncThunk(
  "productVariants/deleteProductVariant",
  async (variantId: string, thunkAPI) => {
    try {
      const res = await deleteProductVariantAPI(variantId);
      return res?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete product variant"
      );
    }
  }
);
export const updateProductVariant = createAsyncThunk(
  "productVariants/updateProductVariant",
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      const response = await updateProductVariantAPI(id, data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update product variant"
      );
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
  product?: { name: string };
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
        state.error =
          (action.payload as string) || "Failed to fetch product variants";
      })

      .addCase(createProductVariant.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })

      .addCase(createProductVariant.fulfilled, (state, action) => {
        state.creating = false;

        // Ensure action.payload and action.payload.data exist
        const newVariant = (action.payload as any)?.data || action.payload;

        // Find product details from existing state
        const product = state.ProductVariants.find(
          (variant: any) => variant.productId === newVariant.productId
        )?.product;

        // Push new variant with product details
        state.ProductVariants.push({
          ...newVariant,
          product: product || { name: "Unknown Product" },
        });
      })

      .addCase(createProductVariant.rejected, (state, action) => {
        state.creating = false;
        state.createError =
          (action.payload as string) || "Failed to create product variant";
      })

      .addCase(updateProductVariant.fulfilled, (state, action) => {
        state.ProductVariants = state.ProductVariants.map((variant: any) =>
          variant.variantId === action.payload.data.variantId
            ? { ...action.payload.data, product: variant.product }
            : variant
        );
      })

      // Delete Product Variant
      .addCase(deleteProductVariant.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProductVariant.fulfilled, (state, action) => {
        state.deleting = false;

        const newVariant = (action.payload as any)?.data || action.payload;


        if (!newVariant?.variantId) return;

        state.ProductVariants = state.ProductVariants.filter(
          (variant: any) => variant.variantId !== newVariant.variantId
        );
      })
      .addCase(deleteProductVariant.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError =
          (action.payload as string) || "Failed to delete product variant";
      });
  },
});

export default productsVariantsSlice.reducer;
