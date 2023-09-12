import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features'

export const store = configureStore({ reducer: rootReducer })

// RootState type
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch