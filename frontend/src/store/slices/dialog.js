import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dialog: [],
};

const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setDialog: (state, action) => {
			state.dialog = action.payload;
		},
	},
});

export const { setDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
