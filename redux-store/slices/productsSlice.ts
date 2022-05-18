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
import { setShowFormModal, setShowLoadingSpinner } from "./uiSlice";

export type ProductsState = {
  selectedProduct: Product | DocumentData | null;
  productQuery: ProductQuery;
};

const initialState: ProductsState = {
  selectedProduct: null,
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

export const addProductData = (
  data: InputValues,
  imageUrl: string | null
): AppThunk => {
  return async (dispatch) => {
    const {
      productName: name,
      category,
      price,
      description,
      quantity,
      cost,
    } = data;

    const collectionRef = collection(db, "products");

    const id = Math.floor(Math.random() * 1000000);

    dispatch(setShowLoadingSpinner(true));
    try {
      await addDoc(collectionRef, {
        id,
        name,
        description,
        category,
        price,
        cost,
        quantity,
        imageUrl,
        dateAdded: serverTimestamp(),
        dateModified: serverTimestamp(),
      });
      console.log("Added Product successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowFormModal(false));
    }
  };
};

export const editProductData = (
  data: InputValues,
  selectedProduct: Product | DocumentData | null,
  imageUrl: string | null
): AppThunk => {
  return async (dispatch) => {
    const {
      productName: name,
      category,
      price,
      description,
      quantity,
      cost,
    } = data;

    const docRef = doc(db, "products", selectedProduct?.docId);

    dispatch(setShowLoadingSpinner(true));
    try {
      await updateDoc(docRef, {
        name,
        description,
        category,
        price,
        cost,
        quantity,
        imageUrl,
        dateModified: serverTimestamp(),
      });

      console.log("Updated Product successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowFormModal(false));
    }
  };
};

const productReducer = productSlice.reducer;

export const { setProduct, setSortQuery } = productSlice.actions;

export default productReducer;
