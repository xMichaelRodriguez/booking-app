import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from './slices/auth';
import {bookingSlice} from './slices/bookings/bookingSlice';
import {serviceSlice} from './slices/services/servicesSlice';
import {uiSlice} from './slices/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    service: serviceSlice.reducer,
    bookings: bookingSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
