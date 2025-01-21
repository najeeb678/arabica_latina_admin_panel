import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../redux/slices/categoriesSlice";

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    categories: categoriesSlice, 
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
