import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], size: [], sort: "h" };

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		addFilterItem(state, action) {
			state.items.push(action.payload);
		},
		removeFilterItem(state, action) {
			delete state.items[action.payload];
		},
		addFilterSize(state, action) {
			state.size.push(action.payload);
		},
		removeFilterSize(state, action) {
			delete state.size[action.payload];
		},
		changeFilterSort(state, action) {
			state.sort = action.payload;
		},
	},
});

const { actions, reducer } = filterSlice;
export const {
	addFilterItem,
	removeFilterItem,
	addFilterSize,
	removeFilterSize,
	changeFilterSort,
} = actions;
export default reducer;
