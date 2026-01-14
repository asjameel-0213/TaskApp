// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";

// Create the Redux store
export const store = configureStore({
    reducer: {
        products: productReducer, // Register products slice
    },
});

export default store;