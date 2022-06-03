import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AppThunk } from "../store";
import { setShowLoadingSpinner } from "./uiSlice";

export type PosState = {
  items: Product[];
  initialItems: Product[];
  purchasedItems: Product[];
};

const initialState: PosState = {
  items: [],
  initialItems: [],
  purchasedItems: [],
};

export const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setInitialItems(state: PosState, action: PayloadAction<Product[]>) {
      state.initialItems = action.payload;
    },
    addAllItems(state: PosState, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    addBillsItem(state: PosState, action: PayloadAction<Product>) {
      const payload = action.payload;

      const existingItem = state.items.find(
        (item) => item.docId === payload.docId
      )!;

      const existingInitialItem = state.initialItems.find(
        (item) => item.docId === payload.docId
      )!;

      const existingBillsItem = state.purchasedItems.find(
        (item) => item.docId === payload.docId
      );

      if (!existingBillsItem) {
        state.purchasedItems.push(payload);
      } else {
        if (existingBillsItem.quantity >= existingInitialItem.quantity) {
          alert("You've reached the maximum quantity for this item!");
          return;
        }
        existingBillsItem.quantity += payload.quantity;
        existingBillsItem.price += payload.price;
      }

      existingItem.quantity -= payload.quantity;
    },
    removeBillsItem(state: PosState, action: PayloadAction<Product>) {
      const payload = action.payload;

      const existingItem = state.items.find(
        (item) => item.docId === payload.docId
      )!;

      const existingBillsItem = state.purchasedItems.find(
        (item) => item.docId === payload.docId
      )!;

      if (existingBillsItem.quantity <= 1) {
        state.purchasedItems = state.purchasedItems.filter(
          (item) => item.docId !== payload.docId
        );
      }

      existingBillsItem.quantity--;
      existingItem.quantity++;
      existingBillsItem.price -= existingItem.price;
    },
    setItemQuantity(state: PosState, action: PayloadAction<Product>) {
      const payload = action.payload;

      const existingItem = state.items.find(
        (item) => item.docId === payload.docId
      )!;

      const existingInitialItem = state.initialItems.find(
        (item) => item.docId === payload.docId
      )!;

      const existingBillsItem = state.purchasedItems.find(
        (item) => item.docId === payload.docId
      )!;

      if (payload.quantity > existingInitialItem.quantity) {
        alert("You've reached the maximum quantity for this item!");
        return;
      }

      existingBillsItem.quantity = payload.quantity;

      existingBillsItem.price = existingItem.price * payload.quantity;

      //* If the input is greater than the current quantity
      //* will increase the current quantity
      if (existingBillsItem!.quantity > payload.quantity) {
        existingItem.quantity = isNaN(payload.quantity)
          ? existingInitialItem.quantity
          : existingInitialItem.quantity + payload.quantity;
      } else {
        existingItem.quantity = isNaN(payload.quantity)
          ? existingInitialItem.quantity
          : existingInitialItem.quantity - payload.quantity;
      }
    },
    clearTransactions(state: PosState) {
      state.items = state.initialItems;
      state.purchasedItems = [];
    },
  },
});

export const fetchProductsData = (): AppThunk => {
  return async (dispatch) => {
    const collectionRef = collection(db, "products");
    const latestProducts = query(
      collectionRef,
      orderBy("dateAdded", "desc")
      // where("quantity", "!=", 0)
    );

    const docSnap = await getDocs(latestProducts);
    const productsDocs: Product[] | DocumentData = docSnap.docs.map((doc) => {
      const dateAdded = doc.data().dateAdded as Timestamp;
      const dateModified = doc.data().dateModified as Timestamp;

      return {
        ...doc.data(),
        docId: doc.id,
        dateAdded: dateAdded
          ? dateAdded.toDate().toLocaleDateString()
          : dateAdded,
        dateModified: dateModified
          ? dateModified.toDate().toLocaleDateString()
          : dateModified,
      };
    });

    dispatch(addAllItems(productsDocs as Product[]));
    dispatch(setInitialItems(productsDocs as Product[]));
  };
};

export const addSalesData = (purchasedItems: Product[]): AppThunk => {
  return async (dispatch) => {
    dispatch(setShowLoadingSpinner(true));

    const id = Math.floor(Math.random() * 1000000);

    // Decrease the quantity of products inventory
    // for every purchased items using Firestore Transaction
    for (const item of purchasedItems) {
      try {
        await runTransaction(db, async (transaction) => {
          const sfDocRef = doc(db, "products", item.docId);
          const sfDoc = await transaction.get(sfDocRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }

          const newQuantity = sfDoc.data().quantity - item.quantity;

          transaction.update(sfDocRef, { quantity: newQuantity });
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }

    const totalPrice = purchasedItems
      .map((item) => item.price)
      .reduce((previousValue, currentValue) => {
        if (isNaN(currentValue)) {
          return previousValue;
        }
        return previousValue + currentValue;
      }, 0);

    await addDoc(collection(db, "sales"), {
      id,
      purchasedItems,
      author: "Admin",
      totalPrice,
      dateAdded: serverTimestamp(),
    });

    dispatch(clearTransactions());
    dispatch(setShowLoadingSpinner(false));
    dispatch(fetchProductsData());
  };
};

const posReducer = posSlice.reducer;

export const {
  addBillsItem,
  addAllItems,
  setInitialItems,
  removeBillsItem,
  setItemQuantity,
  clearTransactions,
} = posSlice.actions;

export default posReducer;
