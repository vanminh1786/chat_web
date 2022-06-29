import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	friend: [],
};

const friendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
		setFriend: (state, action) => {
			state.friend = action.payload;
		},
		addFriend: (state, action) => {
			state.friend.push(action.payload);
		},
	},
});

export const { setFriend, addFriend } = friendSlice.actions;
export default friendSlice.reducer;
