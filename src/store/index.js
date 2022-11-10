import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user";
import cartReducer from "./cart";
import wishlistReducer from "./wishlist";
import filterReducer from "./filters";

const store = configureStore({
	reducer: {
		user: userReducers,
		cart: cartReducer,
		wishlist: wishlistReducer,
		filter: filterReducer,
	},
});

export default store;
