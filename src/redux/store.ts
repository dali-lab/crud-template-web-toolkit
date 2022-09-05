import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dogReducer from './slices/dogSlice';
import connectionReducer from './slices/connectionSlice';

export const store = configureStore({
  reducer: {
    dogs: dogReducer,
    connection: connectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
