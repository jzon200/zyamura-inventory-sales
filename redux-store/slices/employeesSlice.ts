import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export type EmployeesState = {
  employee: Employee | DocumentData | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
  employeeQuery: EmployeeQuery;
};

const initialState: EmployeesState = {
  employee: null,
  showAddDialog: false,
  showEditDialog: false,
  showDeleteDialog: false,
  employeeQuery: {
    sortQuery: "latest",
    label: "Latest",
    queryConstraint: "dateModified",
    descending: true,
  },
};

export const employeesSlice = createSlice({
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
    setEmployeeQuery(state, action: PayloadAction<SortQuery>) {
      switch (action.payload) {
        case "latest":
          state.employeeQuery = {
            sortQuery: "latest",
            label: "Latest",
            queryConstraint: "dateAdded",
            descending: true,
          };
          break;
        case "nameAsc":
          state.employeeQuery = {
            sortQuery: "nameAsc",
            label: "Name A-Z",
            queryConstraint: "name",
          };
          break;
        case "nameDesc":
          state.employeeQuery = {
            sortQuery: "nameDesc",
            label: "Name Z-A",
            queryConstraint: "name",
            descending: true,
          };
          break;

        default:
          state.employeeQuery = {
            sortQuery: "latest",
            label: "Latest",
            queryConstraint: "dateAdded",
            descending: true,
          };
      }
    },
  },
});

const employeesReducer = employeesSlice.reducer;

export const {
  setEmployee,
  setShowAddDialog,
  setShowEditDialog,
  setShowDeleteDialog,
  setEmployeeQuery,
} = employeesSlice.actions;

// export const selectemployee = (state: RootState) => state.employees.employee;

export default employeesReducer;
