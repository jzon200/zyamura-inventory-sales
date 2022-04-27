import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";

const store = configureStore({ reducer: { modal: modalReducer } });

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
