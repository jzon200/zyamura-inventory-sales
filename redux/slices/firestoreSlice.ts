import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData, orderBy, QueryConstraint } from "firebase/firestore";

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

const firestoreReducer = firestoreSlice.reducer;

export const { setSelectedDocument, setSortQuery } = firestoreSlice.actions;

export default firestoreReducer;
