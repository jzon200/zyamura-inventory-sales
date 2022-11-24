import type { DocumentData } from "firebase/firestore";

import type { AppThunk } from "../../../../redux/store";
import { setSelectedDocument } from "../reducers/firestoreReducer";
import { setIsEditing } from "../reducers/formReducer";
import { setShowDeleteDialog, setShowInputForm } from "../reducers/uiReducer";

function showAddForm(): AppThunk {
  return (dispatch) => {
    dispatch(setSelectedDocument(null));
    dispatch(setIsEditing(false));
    dispatch(setShowInputForm(true));
  };
}

function showEditForm(docData: DocumentData): AppThunk {
  return (dispatch) => {
    dispatch(setSelectedDocument(docData));
    dispatch(setIsEditing(true));
    dispatch(setShowInputForm(true));
  };
}

function showDeleteDialog(docData: DocumentData): AppThunk {
  return (dispatch) => {
    dispatch(setSelectedDocument(docData));
    dispatch(setShowDeleteDialog(true));
  };
}

export { showAddForm, showEditForm, showDeleteDialog };
