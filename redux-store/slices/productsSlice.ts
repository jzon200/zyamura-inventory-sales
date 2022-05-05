import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export type ProductsState = {
  product: Product | DocumentData | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
  productQuery: ProductQuery;
};

const initialState: ProductsState = {
  product: null,
  showAddDialog: false,
  showEditDialog: false,
  showDeleteDialog: false,
  productQuery: {
    sort: "latest",
    label: "Latest",
    queryConstraint: "dateModified",
    descending: true,
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<Product>) {
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
    setProductQuery(state, action: PayloadAction<SortQuery>) {
      switch (action.payload) {
        case "latest":
          state.productQuery = {
            sort: "latest",
            label: "Latest",
            queryConstraint: "dateAdded",
            descending: true,
          };
          break;
        case "priceAsc":
          state.productQuery = {
            sort: "priceAsc",
            label: "Lowest Price",
            queryConstraint: "price",
          };
          break;
        case "nameAsc":
          state.productQuery = {
            sort: "nameAsc",
            label: "Name A-Z",
            queryConstraint: "name",
          };
          break;
        case "nameDesc":
          state.productQuery = {
            sort: "nameDesc",
            label: "Name Z-A",
            queryConstraint: "name",
            descending: true,
          };
          break;
        case "priceDesc":
          state.productQuery = {
            sort: "priceDesc",
            label: "Highest Price",
            queryConstraint: "price",
            descending: true,
          };
          break;
        // state.queryConstraint = orderBy("price", "desc");
        case "quantityAsc":
          state.productQuery = {
            sort: "quantityAsc",
            label: "Lowest Quantity",
            queryConstraint: "quantity",
          };
          break;
        case "quantityDesc":
          state.productQuery = {
            sort: "quantityDesc",
            label: "Highest Quantity",
            queryConstraint: "quantity",
            descending: true,
          };
          break;

        // state.queryConstraint = orderBy("quantity", "desc");
        default:
          state.productQuery = {
            sort: "latest",
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

const productReducer = productSlice.reducer;

export const {
  setProduct,
  setShowAddDialog,
  setShowEditDialog,
  setShowDeleteDialog,
  setProductQuery,
} = productSlice.actions;

// export const selectProduct = (state: RootState) => state.products.product;

export default productReducer;
