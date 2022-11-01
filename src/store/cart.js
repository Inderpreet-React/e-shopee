import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItem: {} };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			state.cartItem[action.payload[0]] = [
				action.payload[1],
				action.payload[2],
			];
		},
		removeItem(state, action) {
			console.log(action);
			delete state.cartItem[action.payload];
		},
	},
});

const { actions, reducer } = cartSlice;
export const { addItem, removeItem } = actions;
export default reducer;
