import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], fetching: false, isFiltered: false };

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		updateFilterItems(state, action) {
			state.items = action.payload;
		},
		isFetching(state, action) {
			state.fetching = action.payload;
		},
		updateIsFiltered(state, action) {
			state.isFiltered = action.payload;
		},
	},
});

const { actions, reducer } = filterSlice;
export const { updateFilterItems, isFetching, updateIsFiltered } = actions;
export default reducer;
