import { createSlice } from "@reduxjs/toolkit";

const initialState = { wishlistItem: {} };

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		addWishlistItem(state, action) {
			state.wishlistItem[action.payload] = action.payload;
		},
		removeWishlistItem(state, action) {
			delete state.wishlistItem[action.payload];
		},
	},
});

const { actions, reducer } = wishlistSlice;
export const { addWishlistItem, removeWishlistItem } = actions;
export default reducer;
