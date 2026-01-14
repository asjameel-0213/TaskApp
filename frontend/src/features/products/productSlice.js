import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8888/api/products";

// Async thunks
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    const res = await axios.get(API_URL);
    return res.data;
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
});

export const createProduct = createAsyncThunk("products/create", async (productData) => {
    const res = await axios.post(API_URL, productData);
    return res.data;
});

export const updateProduct = createAsyncThunk("products/update", async ({ id, productData }) => {
    const res = await axios.put(`${API_URL}/${id}`, productData);
    return res.data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Initial state
const productSlice = createSlice({
    name: "products",
    initialState: {
    items: [],
    loading: false,
    error: null,
    selected: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })

        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.selected = action.payload;
        })
    
        .addCase(createProduct.fulfilled, (state, action) => {
            state.items.push(action.payload);
        })
    
        .addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.items.findIndex((p) => p.id === action.payload.id);
            if (index >= 0) state.items[index] = action.payload;
        })

        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.items = state.items.filter((p) => p.id !== action.payload);
        });
    },
});

export default productSlice.reducer;