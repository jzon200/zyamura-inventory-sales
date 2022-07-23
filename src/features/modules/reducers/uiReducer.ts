import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  showLoadingSpinner: boolean;
  showInputForm: boolean;
  showDeleteDialog: boolean;
};

const initialState: UiState = {
  showLoadingSpinner: false,
  showDeleteDialog: false,
  showInputForm: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowLoadingSpinner(state: UiState, action: PayloadAction<boolean>) {
      state.showLoadingSpinner = action.payload;
    },
    setShowInputForm(state: UiState, action: PayloadAction<boolean>) {
      state.showInputForm = action.payload;
    },
    setShowDeleteDialog(state: UiState, action: PayloadAction<boolean>) {
      state.showDeleteDialog = action.payload;
    },
  },
});

export const { setShowLoadingSpinner, setShowDeleteDialog, setShowInputForm } =
  uiSlice.actions;

const uiReducer = uiSlice.reducer;

export default uiReducer;
