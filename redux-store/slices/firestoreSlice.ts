import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  orderBy,
  Query,
  query,
  QueryConstraint,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import { AppThunk } from "../store";
import {
  setShowDeleteDialog,
  setShowFormModal,
  setShowLoadingSpinner,
} from "./uiSlice";

export type FirestoreState = {
  items: DocumentData;
  selectedDocument: DocumentData | null;
  sortQuery: QueryConstraint;
};

const initialState: FirestoreState = {
  items: [],
  selectedDocument: null,
  sortQuery: orderBy("dateAdded", "desc"),
};

const firestoreSlice = createSlice({
  name: "firestore",
  initialState,
  reducers: {
    setSelectedDocument(
      state: FirestoreState,
      action: PayloadAction<DocumentData | null>
    ) {
      state.selectedDocument = action.payload;
    },
    setSortQuery(
      state: FirestoreState,
      action: PayloadAction<QueryConstraint>
    ) {
      state.sortQuery = action.payload;
    },
  },
});

const sortOrder = (): AppThunk => {
  return (dispatch) => {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, orderBy("dateAdded"));
  };
};

const fetchDocumentData = (): AppThunk => {
  return (dispatch) => {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, orderBy("dateAdded"));
  };
};

const addDocumentData = (
  data: InputValues,
  collectionName: CollectionName,
  imagePath: File | null = null
): AppThunk => {
  return async (dispatch) => {
    const collectionRef = collection(db, collectionName);

    const id = Math.floor(Math.random() * 1000000);

    dispatch(setShowLoadingSpinner(true));
    try {
      let imageUrl: string | null = null;
      if (imagePath != null) {
        const storageRef = ref(
          storage,
          `${collectionName}/images/${imagePath.name}`
        );
        await uploadBytes(storageRef, imagePath);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collectionRef, {
        ...data,
        id,
        imageUrl,
        dateAdded: serverTimestamp(),
        dateModified: serverTimestamp(),
      });
      console.log("Added Document successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowFormModal(false));
    }
  };
};

const editDocumentData = (
  data: InputValues,
  collectionName: CollectionName,
  selectedDocument: DocumentData | null,
  imagePath: File | null
): AppThunk => {
  return async (dispatch) => {
    const docRef = doc(db, collectionName, selectedDocument?.docId);

    dispatch(setShowLoadingSpinner(true));
    try {
      let imageUrl: string | null = selectedDocument?.imageUrl;

      if (imagePath != null) {
        const storageRef = ref(
          storage,
          `${collectionName}/images/${imagePath.name}`
        );
        await uploadBytes(storageRef, imagePath);
        imageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(docRef, {
        ...data,
        imageUrl,
        dateModified: serverTimestamp(),
      });

      console.log(`Updated Document ${selectedDocument!.docId} successfully!`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setSelectedDocument(null));
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowFormModal(false));
    }
  };
};

const deleteDocumentData = (
  collectionName: CollectionName,
  selectedDocument: DocumentData | null
): AppThunk => {
  return async (dispatch) => {
    const docRef = doc(db, collectionName, selectedDocument?.docId);

    dispatch(setShowLoadingSpinner(true));
    try {
      await deleteDoc(docRef);
      console.log(`Deleted Document ${selectedDocument!.docId} successfully!`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setSelectedDocument(null));
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowDeleteDialog(false));
    }
  };
};

export { addDocumentData, editDocumentData, deleteDocumentData };

const firestoreReducer = firestoreSlice.reducer;

export const { setSelectedDocument, setSortQuery } = firestoreSlice.actions;

export default firestoreReducer;
