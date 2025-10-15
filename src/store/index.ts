import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import navigationReducer from './slices/navigationSlice';
import packagesReducer from './slices/packagesSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    navigation: navigationReducer,
    packages: packagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
