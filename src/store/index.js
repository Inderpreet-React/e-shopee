import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user";
import cartReducer from "./cart";

const store = configureStore({
	reducer: { user: userReducers, cart: cartReducer },
});

export default store;
