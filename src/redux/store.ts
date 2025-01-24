import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../redux/slices/categoriesSlice";
import productsSlice from "../redux/slices/productsSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
