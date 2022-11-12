import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItem: {}, cartTotal: 0 };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			state.cartItem[action.payload[0]] = action.payload[1];
		},
		removeItem(state, action) {
			delete state.cartItem[action.payload];
		},
		updateCart(state, action) {
			state.cartItem = action.payload;
		},
		updateTotal(state, action) {
			state.cartTotal = action.payload;
		},
	},
});

const { actions, reducer } = cartSlice;
export const { addItem, removeItem, updateCart, updateTotal } = actions;
export default reducer;
