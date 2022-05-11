import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import employeesReducer from "./slices/employeesSlice";
import posReducer from "./slices/posSlice";
import productReducer from "./slices/productsSlice";
import salesReducer from "./slices/salesSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    sales: salesReducer,
    employees: employeesReducer,
    pos: posReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
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
