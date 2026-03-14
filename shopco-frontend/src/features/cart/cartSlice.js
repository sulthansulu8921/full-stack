import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, addToCartAPI, updateCartAPI, removeFromCartAPI } from "./cartAPI";
import api from "../../api/axios";

export const loadCart = createAsyncThunk("cart/load", async () => await fetchCart());

export const addItemToCart = createAsyncThunk("cart/add", async (productId, { dispatch }) => {
    await addToCartAPI(productId);
    dispatch(loadCart());
});

export const updateItemQuantity = createAsyncThunk("cart/update", async ({ productId, quantity }, { dispatch }) => {
    await updateCartAPI(productId, quantity);
    dispatch(loadCart());
});

export const deleteItemFromCart = createAsyncThunk("cart/remove", async (productId, { dispatch }) => {
    await removeFromCartAPI(productId);
    dispatch(loadCart());
});

export const checkout = createAsyncThunk("cart/checkout", async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/orders/checkout/");
        dispatch(clearCart());
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], status: "idle", orderPlaced: false },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
        resetOrderState: (state) => {
            state.orderPlaced = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "success";
            })
            .addCase(checkout.fulfilled, (state) => {
                state.orderPlaced = true;
            });
    },
});

export const { clearCart, resetOrderState } = cartSlice.actions;
export default cartSlice.reducer;
