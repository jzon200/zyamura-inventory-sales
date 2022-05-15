import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AppThunk } from "../store";
import { setLoadingState } from "./uiSlice";

export type PosState = {
  items: Product[];
  purchasedItems: Product[];
  totalPrice: number;
};

const initialState: PosState = {
  items: [],
  purchasedItems: [],
  totalPrice: 0,
};

export const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    addAllItemsHandler(state: PosState, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },

    addItemHandler(state: PosState, action: PayloadAction<Product>) {
      const payload = action.payload;
      const existingItem = state.items.find((item) => item.id === payload.id);
      const existingBillsItem = state.purchasedItems.find(
        (item) => item.id === payload.id
      );

      if (!existingBillsItem) {
        state.purchasedItems.push(payload);
      } else {
        existingBillsItem.quantity += payload.quantity;
        existingBillsItem.price += payload!.price;
      }

      existingItem!.quantity -= payload.quantity;
      state.totalPrice += payload!.price;
    },
    removeItemHandler(state: PosState, action: PayloadAction<Product>) {
      const payload = action.payload;
      const existingItem = state.items.find((item) => item.id === payload.id)!;
      const existingBillsItem = state.purchasedItems.find(
        (item) => item.id === payload.id
      )!;

      if (existingBillsItem.quantity <= 1) {
        state.purchasedItems = state.purchasedItems.filter(
          (item) => item.id !== payload.id
        );
      }

      existingBillsItem.quantity--;
      existingItem.quantity++;
      existingBillsItem.price -= existingItem.price;
      state.totalPrice -= payload.price;
    },
    // TODO: Fix the Logic!
    replaceItemQuantity(state: PosState, action: PayloadAction<Product>) {
      const payload = action.payload;
      const existingItem = state.items.find((item) => item.id === payload.id);
      const existingBillsItem = state.purchasedItems.find(
        (item) => item.id === payload.id
      );

      if (existingBillsItem!.quantity > payload.quantity) {
        console.log("is less");
        existingItem!.quantity += payload.quantity;
        // state.totalPrice -= existingItem!.price * payload.quantity;
      } else {
        console.log("is greater");
        existingItem!.quantity -= payload.quantity;
        // state.totalPrice += existingItem!.price * payload.quantity;
      }

      existingBillsItem!.quantity = payload.quantity;
      existingBillsItem!.price = existingItem!.price * payload.quantity;
    },
    clearTransactions(state: PosState) {
      state.purchasedItems = [];
      state.totalPrice = 0;
    },
  },
});

export const addSalesData = (posState: PosState): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoadingState(true));
    const { purchasedItems, totalPrice } = posState;

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
          // Remove the existing item in the products inventory
          if (newQuantity === 0) {
            transaction.delete(sfDocRef);
          } else {
            transaction.update(sfDocRef, { quantity: newQuantity });
          }
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }

    await addDoc(collection(db, "sales"), {
      id,
      purchasedItems,
      totalPrice,
      author: "Admin",
      dateAdded: serverTimestamp(),
    });

    dispatch(clearTransactions());
    dispatch(setLoadingState(false));
  };
};

const posReducer = posSlice.reducer;

export const {
  addItemHandler,
  addAllItemsHandler,
  removeItemHandler,
  replaceItemQuantity,
  clearTransactions,
} = posSlice.actions;

export default posReducer;
