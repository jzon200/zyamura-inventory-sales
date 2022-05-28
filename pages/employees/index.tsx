import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import EmployeeEntryForm from "../../components/employees/EmployeeEntryForm";
import EmployeesTable from "../../components/employees/EmployeesTable";
import ActionsHeader from "../../components/layout/ActionsHeader";
import DeleteDialog from "../../components/UI/DeleteDialog";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setShowFormModal } from "../../redux-store/slices/uiSlice";

const SORT_OBJECTS = {
  nameAsc: {
    label: "Name A-Z",
    queryConstraint: orderBy("lastName", "asc"),
  },
  nameDesc: {
    label: "Name Z-A",
    queryConstraint: orderBy("lastName", "desc"),
  },
  latest: {
    label: "Latest",
    queryConstraint: orderBy("dateAdded", "desc"),
  },
};

const Employees: NextPage = () => {
  const showFormModal = useAppSelector((state) => state.ui.showFormModal);

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <MuiModal
        showModal={showFormModal}
        onClose={() => dispatch(setShowFormModal(false))}
      >
        <EmployeeEntryForm />
      </MuiModal>
      <DeleteDialog collectionName="employees" />
      <Head>
        <title>Employees | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <ActionsHeader
        sortItems={SORT_OBJECTS}
        title="Employees"
        addLabel="Employee"
      />
      <EmployeesTable />
    </Fragment>
  );
};

export default Employees;
