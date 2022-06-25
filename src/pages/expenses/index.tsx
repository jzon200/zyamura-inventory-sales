import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ContentPlaceholder from "../../components/common/ContentPlaceholder";
import ContentHeader from "../../components/header/ContentHeader";

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

const Expenses: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Expenses | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <ContentHeader
        title="Expenses"
        addLabel="Expenses"
        sortItems={SORT_OBJECTS}
      />
      <ContentPlaceholder />
    </Fragment>
  );
};

export default Expenses;
