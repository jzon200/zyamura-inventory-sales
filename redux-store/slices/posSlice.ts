import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
});

const posReducer = posSlice.reducer;

export const {
  addItemHandler,
  addAllItemsHandler,
  removeItemHandler,
  replaceItemQuantity,
} = posSlice.actions;

export default posReducer;
