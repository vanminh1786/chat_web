import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	name: '',
	phone: '',
	userId: '',
};

const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		},
	},
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
