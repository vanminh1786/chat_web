import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	indexChatting: 0,
	num_friends: 0,
	friend: {},
	saveConv: 0,
};

const chattingSlice = createSlice({
	name: 'chatting',
	initialState,
	reducers: {
		setIndexChatting: (state, action) => {
			// console.log(action.payload);
			state.indexChatting = action.payload;
		},
		increaseNumFriends: (state) => {
			// console.log(action.payload);
			state.num_friends++;
		},
		setFriend: (state, action) => {
			state.friend = action.payload;
			// console.log(action.payload);
		},
		setSaveConv: (state, action) => {
			state.saveConv = action.payload;
		},
	},
});

export const { setIndexChatting, increaseNumFriends, setFriend, setSaveConv } =
	chattingSlice.actions;
export default chattingSlice.reducer;
