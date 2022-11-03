import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, isAuthenticated: false };

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser(state, action) {
			state.user = action;
			state.isAuthenticated = true;
		},
		logoutUser(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});
const { actions, reducer } = userSlice;
export default reducer;
export const { loginUser, logoutUser } = actions;
