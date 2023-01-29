import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	fetching: false,
	isFiltered: false,
	filters: {
		tshirt: false,
		shirt: false,
		jeans: false,
		joggers: false,
		pajamas: false,
		XS: false,
		S: false,
		M: false,
		L: false,
		XL: false,
		XXL: false,
	},
};

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
		setFiltersValue(state, action) {
			console.log(action.payload);
			state.filters[action.payload[0]] = action.payload[1];
		},
		resetFilterValues(state) {
			state.filters = {
				tshirt: false,
				shirt: false,
				jeans: false,
				joggers: false,
				pajamas: false,
				XS: false,
				S: false,
				M: false,
				L: false,
				XL: false,
				XXL: false,
			};
		},
	},
});

const { actions, reducer } = filterSlice;
export const {
	updateFilterItems,
	isFetching,
	updateIsFiltered,
	setFiltersValue,
	resetFilterValues,
} = actions;
export default reducer;
