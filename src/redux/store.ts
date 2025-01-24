import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../redux/slices/categoriesSlice";
import productsVariantsReducer from "./slices/ProductVariantsSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    productsVariants: productsVariantsReducer, // Use the reducer here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
