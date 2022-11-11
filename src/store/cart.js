import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItem: {} };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			state.cartItem[action.payload[0]] = action.payload[1];
		},
		removeItem(state, action) {
			console.log(action);
			delete state.cartItem[action.payload];
		},
		updateCart(state, action) {
			state.cartItem = action.payload;
		},
	},
});

const { actions, reducer } = cartSlice;
export const { addItem, removeItem, updateCart } = actions;
export default reducer;
