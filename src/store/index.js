import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user";
import cartReducer from "./cart";
import wishlistReducer from "./wishlist";

const store = configureStore({
	reducer: { user: userReducers, cart: cartReducer, wishlist: wishlistReducer },
});

export default store;
