import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export type ProductsState = {
  product: Product | DocumentData | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
};

const initialState: ProductsState = {
  product: null,
  showAddDialog: false,
  showEditDialog: false,
  showDeleteDialog: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<Product | DocumentData>) {
      state.product = action.payload;
    },
    setShowAddDialog(state, action: PayloadAction<boolean>) {
      state.showAddDialog = action.payload;
    },
    setShowEditDialog(state, action: PayloadAction<boolean>) {
      state.showEditDialog = action.payload;
    },
    setShowDeleteDialog(state, action: PayloadAction<boolean>) {
      state.showDeleteDialog = action.payload;
    },
  },
});

const productReducer = productSlice.reducer;

export const {
  setProduct,
  setShowAddDialog,
  setShowEditDialog,
  setShowDeleteDialog,
} = productSlice.actions;

// export const selectProduct = (state: RootState) => state.products.product;

export default productReducer;
