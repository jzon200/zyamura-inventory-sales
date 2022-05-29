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
  totalPrice: number;
};

const initialState: PosState = {
  items: [],
  initialItems: [],
  purchasedItems: [],
  totalPrice: 0,
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
      );
      const existingBillsItem = state.purchasedItems.find(
        (item) => item.docId === payload.docId
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
      state.totalPrice -= payload.price;
    },
    // TODO: Fix the NaN value!
    // ! This method is not yet 100% accurate
    setItemQuantity(state: PosState, action: PayloadAction<Product>) {
      const payload = action.payload;
      const existingInitialItem = state.initialItems.find(
        (item) => item.docId === payload.docId
      );
      const existingItem = state.items.find(
        (item) => item.docId === payload.docId
      );
      const existingBillsItem = state.purchasedItems.find(
        (item) => item.docId === payload.docId
      );

      let isLess = false;
      if (existingBillsItem!.quantity > payload.quantity) {
        console.log("is less");
        isLess = true;
        existingItem!.quantity =
          existingInitialItem!.quantity + (payload.quantity - 2);
      } else {
        console.log("is greater");
        existingItem!.quantity =
          existingInitialItem!.quantity - payload.quantity;
      }

      existingBillsItem!.quantity = payload.quantity;
      existingBillsItem!.price = existingItem!.price * payload.quantity;

      //* This approach is kinda hacky🐱‍💻
      if (isLess) {
        state.totalPrice -= payload.price + existingBillsItem!.price;
        state.totalPrice = Math.abs(state.totalPrice);
        return;
      }
      state.totalPrice += existingBillsItem!.price - payload.price;
    },
    clearTransactions(state: PosState) {
      state.items = state.initialItems;
      state.purchasedItems = [];
      state.totalPrice = 0;
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

export const addSalesData = (posState: PosState): AppThunk => {
  return async (dispatch) => {
    dispatch(setShowLoadingSpinner(true));
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

          transaction.update(sfDocRef, { quantity: newQuantity });

          //! Remove the existing item in the products inventory
          //! if the quantity is 0, this is revised by the panelists
          // if (newQuantity === 0) {
          //   transaction.delete(sfDocRef);
          // } else {
          //   transaction.update(sfDocRef, { quantity: newQuantity });
          // }
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
