import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userName: null,
	userUid: null,
	userEmail: null,
	isAuthenticated: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser(state, action) {
			state.userName = action.payload.userName;
			state.userUid = action.payload.uid;
			state.userEmail = action.payload.email;
			state.isAuthenticated = true;
		},
		logoutUser(state) {
			state.userName = null;
			state.userUid = null;
			state.userEmail = null;
			state.isAuthenticated = false;
		},
	},
});
const { actions, reducer } = userSlice;
export default reducer;
export const { loginUser, logoutUser } = actions;
