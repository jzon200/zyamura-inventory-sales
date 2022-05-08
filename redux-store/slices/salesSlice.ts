import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export type SalesState = {
  sales: Sales | DocumentData | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
};

const initialState: SalesState = {
  sales: null,
  showAddDialog: false,
  showEditDialog: false,
  showDeleteDialog: false,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales(state, action: PayloadAction<Employee>) {
      state.sales = action.payload;
    },
    setShowAddDialog(state, action: PayloadAction<boolean>) {
      state.showAddDialog = action.payload;
    },
    setShowEditDialog(state, action: PayloadAction<boolean>) {
      state.showEditDialog = action.payload;
    },
    setShowDeleteDialog(state, action: PayloadAction<boolean>) {
      state.showDeleteDialog = action.payload;
    },
  },
});

const salesReducer = salesSlice.reducer;

export const {
  setSales,
  setShowAddDialog,
  setShowEditDialog,
  setShowDeleteDialog,
} = salesSlice.actions;

// export const selectemployee = (state: RootState) => state.employees.employee;

export default salesReducer;
