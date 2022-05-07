import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import employeesReducer from "./slices/employeesSlice";
import productReducer from "./slices/productsSlice";

const store = configureStore({
  reducer: { products: productReducer, employees: employeesReducer },
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
