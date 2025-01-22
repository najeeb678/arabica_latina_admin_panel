import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../api/CategoriesAPI";

// Async Thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const data = await getCategories();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);


interface CategoriesState {
  categories: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;

