import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../redux/slices/categoriesSlice";
import productsSlice from "../redux/slices/productsSlice";
import productsVariantsSlice from "./slices/ProductVariantsSlice";
import ordersSlice from './slices/OrdersSlice';
import customersSlice from "./slices/CustomersSlice";
import authSlice from '../redux/slices/authSlice'; 

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    productsVariants: productsVariantsSlice, 
    products: productsSlice,
    orders: ordersSlice,
    customers: customersSlice,
    auth: authSlice, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
