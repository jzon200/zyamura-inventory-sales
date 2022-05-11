import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PosState = {
  selectedItems: Product[];
  totalPrice: number;
};

const initialState: PosState = {
  selectedItems: [],
  totalPrice: 0,
};

export const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<Product>) {
      // const newItem = action.payload;
      // const existingItem = state.selectedItems.find(
      //   (item) => item.id === newItem.id
      // );
      // state.selectedItems.push(action.payload);
      // state.totalPrice += action.payload.price;
      // state.selectedItems[0].quantity--;
      if (
        state.selectedItems.some((item) => item.docId === action.payload.docId)
      ) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.docId !== action.payload.docId
        );
        state.totalPrice -= action.payload.price;
      } else {
        state.selectedItems.push(action.payload);
        state.totalPrice += action.payload.price;
        state.selectedItems;
      }
    },
  },
});

const posReducer = posSlice.reducer;

export const { addItems } = posSlice.actions;

export default posReducer;
