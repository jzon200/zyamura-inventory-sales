import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AppThunk } from "../store";
import { setLoadingState } from "./uiSlice";

export type ProductsState = {
  selectedProduct: Product | DocumentData | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
  productQuery: ProductQuery;
};

const initialState: ProductsState = {
  selectedProduct: null,
  showAddDialog: false,
  showEditDialog: false,
  showDeleteDialog: false,
  productQuery: {
    sortQuery: "latest",
    label: "Latest",
    queryConstraint: "dateAdded",
    descending: true,
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct(state: ProductsState, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    setShowAddDialog(state: ProductsState, action: PayloadAction<boolean>) {
      state.showAddDialog = action.payload;
    },
    setShowEditDialog(state: ProductsState, action: PayloadAction<boolean>) {
      state.showEditDialog = action.payload;
    },
    setShowDeleteDialog(state: ProductsState, action: PayloadAction<boolean>) {
      state.showDeleteDialog = action.payload;
    },
    setSortQuery(state: ProductsState, action: PayloadAction<SortQuery>) {
      switch (action.payload) {
        case "latest":
          state.productQuery = {
            sortQuery: "latest",
            label: "Latest",
            queryConstraint: "dateAdded",
            descending: true,
          };
          break;
        case "priceAsc":
          state.productQuery = {
            sortQuery: "priceAsc",
            label: "Lowest Price",
            queryConstraint: "price",
          };
          break;
        case "nameAsc":
          state.productQuery = {
            sortQuery: "nameAsc",
            label: "Name A-Z",
            queryConstraint: "name",
          };
          break;
        case "nameDesc":
          state.productQuery = {
            sortQuery: "nameDesc",
            label: "Name Z-A",
            queryConstraint: "name",
            descending: true,
          };
          break;
        case "priceDesc":
          state.productQuery = {
            sortQuery: "priceDesc",
            label: "Highest Price",
            queryConstraint: "price",
            descending: true,
          };
          break;
        // state.queryConstraint = orderBy("price", "desc");
        case "quantityAsc":
          state.productQuery = {
            sortQuery: "quantityAsc",
            label: "Lowest Quantity",
            queryConstraint: "quantity",
          };
          break;
        case "quantityDesc":
          state.productQuery = {
            sortQuery: "quantityDesc",
            label: "Highest Quantity",
            queryConstraint: "quantity",
            descending: true,
          };
          break;

        // state.queryConstraint = orderBy("quantity", "desc");
        default:
          state.productQuery = {
            sortQuery: "latest",
            label: "Latest",
            queryConstraint: "dateAdded",
            descending: true,
          };
        // state.queryConstraint = orderBy("dateAdded", "desc");
      }
      // state.queryConstraint = action.payload;
    },
  },
});

//! Cannot use yet
export const addProductData = (data: InputValues): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoadingState(true));

    const {
      productName: name,
      category,
      price,
      description,
      quantity,
      cost,
    } = data;

    const productsCollectionRef = collection(db, "products");

    const id = Math.floor(Math.random() * 1000000);

    await addDoc(productsCollectionRef, {
      id,
      name,
      description,
      category,
      price,
      cost,
      quantity,
      // imageUrl,
      dateAdded: serverTimestamp(),
      dateModified: serverTimestamp(),
    })
      .then(() => console.log("success"))
      .catch((error) => console.log(error.message));

    dispatch(setLoadingState(false));
  };
};

export const editProductData = (
  data: InputValues,
  selectedProduct: Product
): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoadingState(true));

    const {
      productName: name,
      category,
      price,
      description,
      quantity,
      cost,
    } = data;

    const productDocRef = doc(db, "products", selectedProduct?.docId);

    await updateDoc(productDocRef, {
      name,
      description,
      category,
      price,
      cost,
      quantity,
      dateModified: serverTimestamp(),
    })
      .then(() => console.log("success"))
      .catch((error) => console.log(error.message));

    dispatch(setLoadingState(false));
  };
};

const productReducer = productSlice.reducer;

export const {
  setProduct,
  setShowAddDialog,
  setShowEditDialog,
  setShowDeleteDialog,
  setSortQuery,
} = productSlice.actions;

export default productReducer;
