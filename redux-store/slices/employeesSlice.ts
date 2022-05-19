import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import { AppThunk } from "../store";
import { setShowFormModal, setShowLoadingSpinner } from "./uiSlice";

export type EmployeesState = {
  selectedEmployee: Employee | DocumentData | null;
  employeeQuery: EmployeeQuery;
};

const initialState: EmployeesState = {
  selectedEmployee: null,
  employeeQuery: {
    sortQuery: "latest",
    label: "Latest",
    queryConstraint: "dateAdded",
    descending: true,
  },
};

export const employeesSlice = createSlice({
  name: "employess",
  initialState,
  reducers: {
    setEmployee(state: EmployeesState, action: PayloadAction<Employee | null>) {
      state.selectedEmployee = action.payload;
    },
    setEmployeeQuery(state: EmployeesState, action: PayloadAction<SortQuery>) {
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

export const addEmployeeData = (
  data: InputValues,
  imagePath: File | null
): AppThunk => {
  return async (dispatch) => {
    const { firstName, lastName, contactNumber, email, role } = data;

    const collectionRef = collection(db, "employees");

    const id = Math.floor(Math.random() * 1000000);

    dispatch(setShowLoadingSpinner(true));
    try {
      let imageUrl: string | null = null;
      if (imagePath) {
        const storageRef = ref(storage, `products/images/${imagePath.name}`);
        await uploadBytes(storageRef, imagePath);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collectionRef, {
        id,
        firstName,
        lastName,
        contactNumber,
        email,
        role: role ? role : null,
        imageUrl,
        dateAdded: serverTimestamp(),
        dateModified: serverTimestamp(),
      });

      console.log("Added Employee successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setEmployee(null));
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowFormModal(false));
    }
  };
};

export const editEmployeeData = (
  data: InputValues,
  selectedEmployee: Employee | DocumentData | null,
  imagePath: File | null
): AppThunk => {
  return async (dispatch) => {
    const { firstName, lastName, contactNumber, email, role } = data;

    const docRef = doc(db, "employees", selectedEmployee?.docId);

    dispatch(setShowLoadingSpinner(true));
    try {
      let imageUrl: string | null = selectedEmployee?.imageUrl;
      if (imagePath) {
        const storageRef = ref(storage, `products/images/${imagePath.name}`);
        await uploadBytes(storageRef, imagePath);
        imageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(docRef, {
        firstName,
        lastName,
        contactNumber,
        email,
        role,
        imageUrl,
        dateModified: serverTimestamp(),
      });

      console.log("Updated Employee successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(setEmployee(null));
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowFormModal(false));
    }
  };
};

const employeesReducer = employeesSlice.reducer;

export const { setEmployee, setEmployeeQuery } = employeesSlice.actions;

export default employeesReducer;
