import { configureStore } from '@reduxjs/toolkit';

import { adminReducer, authReducer, pollReducer, vacationReducer } from './reducers';

export const store = configureStore({
  reducer: {
    authReducer,
    adminReducer,
    pollReducer,
    vacationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});
