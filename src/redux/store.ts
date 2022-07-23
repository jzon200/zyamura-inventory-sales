import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import {
  firestoreReducer,
  formReducer,
  uiReducer,
} from "../features/modules/reducers";
import posReducer from "../features/pos/reducer";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    pos: posReducer,
    firestore: firestoreReducer,
    form: formReducer,
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
