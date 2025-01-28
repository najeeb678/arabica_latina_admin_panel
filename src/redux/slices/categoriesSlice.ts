import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, createCategory, deleteCategory, uploadImageApi } from "../api/CategoriesAPI";

// Async Thunk to upload image
export const uploadImage = createAsyncThunk(
  "categories/uploadImage",
  async (imageData: FormData, thunkAPI) => {
    try {
      const uploadedImageUrl = await uploadImageApi(imageData);
      return uploadedImageUrl; // Return the uploaded image URL
    } catch (error: unknown) {
      let message = "Failed to upload image";
      if (error instanceof Error) {
        message = error.message;
      } else if (error && (error as any).response?.data) {
        message = (error as any).response.data || "Failed to upload image";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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

// Async Thunk to create a new category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData: { name: string; gender: string; categoryImage?: string }, thunkAPI) => {
    try {
      const newCategory = await createCategory(categoryData);
      return newCategory;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create category");
    }
  }
);

// Async Thunk to delete a category
export const removeCategory = createAsyncThunk<
  string, // Return type (ID of the deleted category or response message)
  string, // Argument type (ID of the category to delete)
  { rejectValue: string } // Rejection error type
>("categories/removeCategory", async (id, thunkAPI) => {
  try {
    await deleteCategory(id);
    return id; // Return the ID of the deleted category
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to delete category");
  }
});

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
      // Fetch categories cases
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
      })

      // Add category cases
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove category cases
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Display the actual error message
    });
  },
});

export default categoriesSlice.reducer;
