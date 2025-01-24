import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../redux/slices/categoriesSlice";
import productsSlice from "../redux/slices/productsSlice";
import productsVariantsReducer from "./slices/ProductVariantsSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    productsVariants: productsVariantsReducer, // Use the reducer here
    products: productsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
