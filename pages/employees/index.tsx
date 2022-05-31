import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import DeleteDialog from "../../components/common/DeleteDialog";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowFormModal } from "../../redux/slices/uiSlice";
import MuiModal from "../../components/common/Modal";
import EmployeeEntryForm from "../../components/pages/employees/EmployeeEntryForm";
import EmployeesDataGrid from "../../components/pages/employees/EmployeesDataGrid";
import ContentHeader from "../../components/header/ContentHeader";
import { initialSort } from "../../redux/slices/firestoreSlice";

const SORT_OBJECTS = {
  nameAsc: {
    label: "Name A-Z",
    sortQuery: orderBy("lastName", "asc"),
  },
  nameDesc: {
    label: "Name Z-A",
    sortQuery: orderBy("lastName", "desc"),
  },
  latest: {
    label: "Latest",
    sortQuery: orderBy("dateAdded", "desc"),
  },
};

const Employees: NextPage = () => {
  const showFormModal = useAppSelector((state) => state.ui.showFormModal);

  const dispatch = useAppDispatch();

  dispatch(initialSort());

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
      <ContentHeader
        sortItems={SORT_OBJECTS}
        title="Employees"
        addLabel="Employee"
      />
      <EmployeesDataGrid />
    </Fragment>
  );
};

export default Employees;
