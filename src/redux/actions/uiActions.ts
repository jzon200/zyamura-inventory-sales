import { DocumentData } from "firebase/firestore";
import { setSelectedDocument } from "../slices/firestoreSlice";
import {
  setFormAction,
  setShowDeleteDialog,
  setShowFormModal,
} from "../slices/uiSlice";
import { AppThunk } from "../store";

const showAddForm = (): AppThunk => {
  return (dispatch) => {
    dispatch(setFormAction("add"));
    dispatch(setShowFormModal(true));
    dispatch(setSelectedDocument(null));
  };
};

const showEditForm = (docData: DocumentData): AppThunk => {
  return (dispatch) => {
    dispatch(setFormAction("edit"));
    dispatch(setSelectedDocument(docData));
    dispatch(setShowFormModal(true));
  };
};

const showDeleteDialog = (docData: DocumentData): AppThunk => {
  return (dispatch) => {
    dispatch(setSelectedDocument(docData));
    dispatch(setShowDeleteDialog(true));
  };
};

export { showAddForm, showEditForm, showDeleteDialog };
