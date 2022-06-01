import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import firestoreReducer from "./slices/firestoreSlice";
import posReducer from "./slices/posSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    pos: posReducer,
    firestore: firestoreReducer,
    auth: authReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
