import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ModalState = {
  isOpen: boolean;
};

const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

const modalReducer = modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal.isOpen;

export default modalReducer;
