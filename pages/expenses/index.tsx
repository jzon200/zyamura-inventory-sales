import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import EmptyPlaceholder from "../../components/UI/EmptyPlaceholder";

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

const Expenses: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Expenses | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <ActionsHeader
        title="Expenses"
        addLabel="Expenses"
        sortItems={SORT_OBJECTS}
      />
      <EmptyPlaceholder />
    </Fragment>
  );
};

export default Expenses;
