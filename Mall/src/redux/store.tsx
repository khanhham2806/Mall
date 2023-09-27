
// redux saga or redux thunk
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { CartReducer } from './reducers/CartReducer';

const store = configureStore({
    reducer: combineReducers({
        CartReducer
    }),
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(logger, thunk),
    // devTools: true,
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
