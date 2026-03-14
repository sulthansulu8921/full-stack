import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "./productAPI";

export const loadProducts = createAsyncThunk(
  "products/load",
  async (filters) => await fetchProducts(filters)
);

export const loadProductDetail = createAsyncThunk(
  "products/loadDetail",
  async (id) => await fetchProductById(id)
);

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], currentProduct: null, status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(loadProductDetail.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.status = "success";
      });
  },
});

export default productSlice.reducer;
