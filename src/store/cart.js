import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItem: {}, cartTotal: 0, loading: false };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		updateCart(state, action) {
			state.cartItem = action.payload;
		},
		updateTotal(state, action) {
			state.cartTotal = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
	},
});

const { actions, reducer } = cartSlice;
export const { addItem, removeItem, updateCart, updateTotal, setLoading } =
	actions;
export default reducer;
