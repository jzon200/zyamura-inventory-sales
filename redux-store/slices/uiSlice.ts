import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { AppThunk } from "../store";
import { setSelectedDocument } from "./firestoreSlice";

export type UiState = {
  showLoadingSpinner: boolean;
  showFormModal: boolean;
  showDeleteDialog: boolean;
  formAction: FormAction;
};

const initialState: UiState = {
  showLoadingSpinner: false,
  showDeleteDialog: false,
  showFormModal: false,
  formAction: "add",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowLoadingSpinner(state: UiState, action: PayloadAction<boolean>) {
      state.showLoadingSpinner = action.payload;
    },
    setShowDeleteDialog(state: UiState, action: PayloadAction<boolean>) {
      state.showDeleteDialog = action.payload;
    },
    setShowFormModal(state: UiState, action: PayloadAction<boolean>) {
      state.showFormModal = action.payload;
    },
    setFormAction(state: UiState, action: PayloadAction<FormAction>) {
      state.formAction = action.payload;
    },
  },
});

const showAddForm = (): AppThunk => {
  return (dispatch) => {
    dispatch(setFormAction("add"));
    dispatch(setShowFormModal(true));
    dispatch(setSelectedDocument(null));
  };
};

const showEditForm = (docData: DocumentData): AppThunk => {
  return (dispatch) => {
    dispatch(setSelectedDocument(docData));
    dispatch(setShowDeleteDialog(true));
  };
};

export { showAddForm, showEditForm };

export const {
  setShowLoadingSpinner,
  setShowFormModal,
  setShowDeleteDialog,
  setFormAction,
} = uiSlice.actions;

const uiReducer = uiSlice.reducer;

export default uiReducer;
