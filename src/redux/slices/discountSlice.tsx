import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllDiscountsApi } from "../api/discountApi";

interface discountsSliceState {
  allDiscountData: any[];
  discountDataloading: boolean;
}

const initialState: discountsSliceState = {
  allDiscountData: [],
  discountDataloading: false,
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

export const discountsSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllDiscounts.pending, (state) => {
        state.discountDataloading = true;
      })
      .addCase(fetchAllDiscounts.fulfilled, (state, action) => {
        state.allDiscountData = action.payload;
        state.discountDataloading = false;
      })
      .addCase(fetchAllDiscounts.rejected, (state) => {
        state.discountDataloading = false;
      });
  },
});

export default discountsSlice.reducer;
