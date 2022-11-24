import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { firestoreReducer, posReducer, uiReducer } from "./slices";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    pos: posReducer,
    firestore: firestoreReducer,
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
