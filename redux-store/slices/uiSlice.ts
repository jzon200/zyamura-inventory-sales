import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UiState = {
  isLoading: boolean;
};

const initialState: UiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoadingState(state: UiState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoadingState } = uiSlice.actions;

const uiReducer = uiSlice.reducer;

export default uiReducer;
