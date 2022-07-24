import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData, orderBy, QueryConstraint } from "firebase/firestore";

type FirestoreState = {
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
    initialSort(state: FirestoreState) {
      state.sortQuery = initialState.sortQuery;
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

export const { setSelectedDocument, initialSort, setSortQuery } =
  firestoreSlice.actions;

export default firestoreReducer;
