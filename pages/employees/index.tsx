import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import AddEmployeeForm from "../../components/employees/AddEmployeeForm";
import DeleteEmployeeDialog from "../../components/employees/DeleteEmployeeDialog";
import EditEmployeeForm from "../../components/employees/EditEmployeeForm";
import EmployeesTable from "../../components/employees/EmployeesTable";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  setShowAddDialog,
  setShowDeleteDialog,
  setShowEditDialog,
} from "../../redux-store/slices/employeesSlice";

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
  const { showAddDialog, showEditDialog, showDeleteDialog, selectedQuery } =
    useAppSelector((state) => ({
      showAddDialog: state.employees.showAddDialog,
      showEditDialog: state.employees.showEditDialog,
      showDeleteDialog: state.employees.showDeleteDialog,
      selectedQuery: state.employees.employeeQuery,
    }));

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <MuiModal
        showModal={showAddDialog}
        onClose={() => dispatch(setShowAddDialog(false))}
      >
        <AddEmployeeForm />
      </MuiModal>
      <MuiModal
        showModal={showEditDialog}
        onClose={() => dispatch(setShowEditDialog(false))}
      >
        <EditEmployeeForm />
      </MuiModal>
      <DeleteEmployeeDialog
        showDialog={showDeleteDialog}
        onClose={() => dispatch(setShowDeleteDialog(false))}
      />
      <Head>
        <title>Employees | Zyamura Inventory & Sales</title>
      </Head>
      <ActionsHeader
        sortItems={SORT_QUERIES}
        selectedQuery={selectedQuery}
        title="Employees"
        onAddHandler={() => dispatch(setShowAddDialog(true))}
      />
      <TableHeader items={TABLE_HEADERS} />
      <EmployeesTable />
    </Fragment>
  );
};

export default Employees;
