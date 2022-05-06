import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export type EmployeesState = {
  employee: Employee | DocumentData | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
  employeeQuery: ProductQuery;
};

const initialState: EmployeesState = {
  employee: null,
  showAddDialog: false,
  showEditDialog: false,
  showDeleteDialog: false,
  employeeQuery: {
    sort: "latest",
    label: "Latest",
    queryConstraint: "dateModified",
    descending: true,
  },
};

export const employeeSlice = createSlice({
  name: "employess",
  initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee>) {
      state.employee = action.payload;
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
    setemployeeQuery(state, action: PayloadAction<SortQuery>) {
      switch (action.payload) {
        case "latest":
          state.employeeQuery = {
            sort: "latest",
            label: "Latest",
            queryConstraint: "dateAdded",
            descending: true,
          };
          break;
        case "priceAsc":
          state.employeeQuery = {
            sort: "priceAsc",
            label: "Lowest Price",
            queryConstraint: "price",
          };
          break;
        case "nameAsc":
          state.employeeQuery = {
            sort: "nameAsc",
            label: "Name A-Z",
            queryConstraint: "name",
          };
          break;
        case "nameDesc":
          state.employeeQuery = {
            sort: "nameDesc",
            label: "Name Z-A",
            queryConstraint: "name",
            descending: true,
          };
          break;
        case "priceDesc":
          state.employeeQuery = {
            sort: "priceDesc",
            label: "Highest Price",
            queryConstraint: "price",
            descending: true,
          };
          break;
        // state.queryConstraint = orderBy("price", "desc");
        case "quantityAsc":
          state.employeeQuery = {
            sort: "quantityAsc",
            label: "Lowest Quantity",
            queryConstraint: "quantity",
          };
          break;
        case "quantityDesc":
          state.employeeQuery = {
            sort: "quantityDesc",
            label: "Highest Quantity",
            queryConstraint: "quantity",
            descending: true,
          };
          break;

        // state.queryConstraint = orderBy("quantity", "desc");
        default:
          state.employeeQuery = {
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

const employeeReducer = employeeSlice.reducer;

export const {
  setEmployee: setemployee,
  setShowAddDialog,
  setShowEditDialog,
  setShowDeleteDialog,
  setemployeeQuery,
} = employeeSlice.actions;

// export const selectemployee = (state: RootState) => state.employees.employee;

export default employeeReducer;
