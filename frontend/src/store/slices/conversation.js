import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	conversation: [],
};

const conversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setConversation: (state, action) => {
			// console.log(action.payload);
			state.conversation = action.payload;
		},
	},
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
