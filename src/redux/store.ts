import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dogReducer from './slices/dogSlice';
import connectionReducer from './slices/connectionSlice';
import userReducer from './slices/userSlice';
import resourceReducer from './slices/resourceSlice';

export const store = configureStore({
  reducer: {
    dogs: dogReducer,
    connection: connectionReducer,
    user: userReducer,
    resources: resourceReducer,
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
