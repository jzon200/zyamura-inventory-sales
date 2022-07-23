import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

import { MuiModal } from "../../../common/components";
import {
  ContentHeader,
  DeleteDialog,
} from "../../../features/modules/components";
import {
  EmployeeEntryForm,
  EmployeesDataGrid,
} from "../../../features/modules/employees";
import { initialSort } from "../../../features/modules/reducers/firestoreReducer";
import { setShowInputForm } from "../../../features/modules/reducers/uiReducer";
import getServerSideAuth from "../../../lib/getServerSideAuth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

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
  const showInputForm = useAppSelector((state) => state.ui.showInputForm);
  const dispatch = useAppDispatch();

  dispatch(initialSort());

  return (
    <Fragment>
      <MuiModal
        showModal={showInputForm}
        onClose={() => dispatch(setShowInputForm(false))}
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

export const getServerSideProps = getServerSideAuth;

export default Employees;
