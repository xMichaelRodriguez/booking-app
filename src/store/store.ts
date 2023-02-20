import {configureStore} from '@reduxjs/toolkit';
import {authSlace} from '../slices/auth';

export const store = configureStore({
  reducer: {
    auth: authSlace.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
