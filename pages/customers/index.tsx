import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ContentPlaceholder from "../../components/common/ContentPlaceholder";
import ContentHeader from "../../components/header/ContentHeader";

const TABLE_HEADERS = [
  { label: "" },
  { label: "ID" },
  { label: "Username" },
  { label: "Name" },
  { label: "Email" },
  { label: "Address" },
  { label: "Mobile number" },
];

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

const Customers: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Customers | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <ContentHeader sortItems={SORT_OBJECTS} title="Customers" />
      <ContentPlaceholder />
    </Fragment>
  );
};

export default Customers;
