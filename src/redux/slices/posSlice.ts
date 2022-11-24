import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
