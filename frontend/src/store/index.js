import { configureStore } from '@reduxjs/toolkit';
import {
	// conversationReducer,
	// dialogReducer,
	// friendReducer,
	// userInfoReducer,
	chattingReducer,
} from './slices';

const store = configureStore({
	reducer: {
		// conversation: conversationReducer,
		// dialog: dialogReducer,
		// friend: friendReducer,
		// userInfo: userInfoReducer,
		chatting: chattingReducer,
	},
});

// export { chattingReducer };
export default store;
