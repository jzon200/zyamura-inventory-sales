import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import DeleteEmployeeDialog from "../../components/employees/DeleteEmployeeDialog";
import EmployeeEntryForm from "../../components/employees/EmployeeEntryForm";
import EmployeesTable from "../../components/employees/EmployeesTable";
import ActionsHeader from "../../components/layout/ActionsHeader";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setEmployee } from "../../redux-store/slices/employeesSlice";
import {
  setFormAction,
  setShowDeleteDialog,
  setShowFormModal,
} from "../../redux-store/slices/uiSlice";

const SORT_QUERIES: EmployeeQuery[] = [
  {
    sortQuery: "nameAsc",
    label: "Name A-Z",
  },
  {
    sortQuery: "nameDesc",
    label: "Name Z-A",
  },
  {
    sortQuery: "latest",
    label: "Latest",
  },
];

const Employees: NextPage = () => {
  const { showFormModal, showDeleteDialog, selectedQuery } = useAppSelector(
    (state) => ({
      showFormModal: state.ui.showFormModal,
      showDeleteDialog: state.ui.showDeleteDialog,
      selectedQuery: state.employees.employeeQuery,
    })
  );

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <MuiModal
        showModal={showFormModal}
        onClose={() => dispatch(setShowFormModal(false))}
      >
        <EmployeeEntryForm />
      </MuiModal>
      <DeleteEmployeeDialog
        showDialog={showDeleteDialog}
        onClose={() => dispatch(setShowDeleteDialog(false))}
      />
      <Head>
        <title>Employees | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <ActionsHeader
        sortItems={SORT_QUERIES}
        selectedQuery={selectedQuery}
        title="Employees"
        addLabel="Employee"
        onAddHandler={() => {
          dispatch(setEmployee(null));
          dispatch(setFormAction("add"));
          dispatch(setShowFormModal(true));
        }}
      />
      <EmployeesTable />
    </Fragment>
  );
};

export default Employees;
