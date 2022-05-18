import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import AddOrEditEmployee from "../../components/employees/AddOrEditEmployee";
import DeleteEmployeeDialog from "../../components/employees/DeleteEmployeeDialog";
import EmployeesTable from "../../components/employees/EmployeesTable";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setEmployee } from "../../redux-store/slices/employeesSlice";
import {
  setFormAction,
  setShowDeleteDialog,
  setShowFormModal,
} from "../../redux-store/slices/uiSlice";

const TABLE_HEADERS = [
  { label: "" },
  { label: "Employee ID" },
  { label: "Name" },
  { label: "Contact number" },
  { label: "Email" },
  { label: "Role" },
  { label: "Action " },
];

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
        <AddOrEditEmployee />
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
        addLabel="Employees"
        onAddHandler={() => {
          dispatch(setEmployee(null));
          dispatch(setFormAction("add"));
          dispatch(setShowFormModal(true));
        }}
      />
      <TableHeader items={TABLE_HEADERS} />
      <EmployeesTable />
    </Fragment>
  );
};

export default Employees;
