import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllDiscountsApi,
  createDiscountApi,
  updateDiscountApi,
  deleteDiscountApi,
} from "../api/discountApi";

interface DiscountsSliceState {
  allDiscountData: any[];
  discountDataloading: boolean;
  createDiscountLoading: boolean;
  updateDiscountLoading: boolean;
  deleteDiscountLoading: boolean;
}

const initialState: DiscountsSliceState = {
  allDiscountData: [],
  discountDataloading: false,
  createDiscountLoading: false,
  updateDiscountLoading: false,
  deleteDiscountLoading: false,
};

export const fetchAllDiscounts = createAsyncThunk(
  "discount/fetchAllDiscounts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllDiscountsApi();
      return data;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const createDiscount = createAsyncThunk(
  "discount/createDiscount",
  async (payload: { percentage: string }, { rejectWithValue }) => {
    try {
      const data = await createDiscountApi(payload);
      return data;
    } catch (err: unknown) {
      return rejectWithValue("Failed to create discount");
    }
  }
);

export const updateDiscount = createAsyncThunk(
  "discount/updateDiscount",
  async ({ id, payload }: { id: string; payload: { percentage: string } }, { rejectWithValue }) => {
    try {
      const data = await updateDiscountApi(id, payload);
      return { id, data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to update discount");
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discount/deleteDiscount",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDiscountApi(id);
      return id;
    } catch (err: unknown) {
      return rejectWithValue("Failed to delete discount");
    }
  }
);

export const discountsSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Discounts
      .addCase(fetchAllDiscounts.pending, (state) => {
        state.discountDataloading = true;
      })
      .addCase(fetchAllDiscounts.fulfilled, (state, action) => {
        state.allDiscountData = action.payload;
        state.discountDataloading = false;
      })
      .addCase(fetchAllDiscounts.rejected, (state) => {
        state.discountDataloading = false;
      })

      // Create Discount
      .addCase(createDiscount.pending, (state) => {
        state.createDiscountLoading = true;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.allDiscountData.push(action.payload);
        state.createDiscountLoading = false;
      })
      .addCase(createDiscount.rejected, (state) => {
        state.createDiscountLoading = false;
      })

      // Update Discount
      .addCase(updateDiscount.pending, (state) => {
        state.updateDiscountLoading = true;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        const index = state.allDiscountData.findIndex(
          (d) => d.discountId === action.payload.id
        );
        if (index !== -1) {
          state.allDiscountData[index] = action.payload.data;
        }
        state.updateDiscountLoading = false;
      })
      .addCase(updateDiscount.rejected, (state) => {
        state.updateDiscountLoading = false;
      })

      // Delete Discount (Mark as Deleted Instead of Removing)
      .addCase(deleteDiscount.pending, (state) => {
        state.deleteDiscountLoading = true;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        const index = state.allDiscountData.findIndex(
          (d) => d.discountId === action.payload
        );
        if (index !== -1) {
          state.allDiscountData[index].is_Deleted = true;
        }
        state.deleteDiscountLoading = false;
      })
      .addCase(deleteDiscount.rejected, (state) => {
        state.deleteDiscountLoading = false;
      });
  },
});

export default discountsSlice.reducer;

