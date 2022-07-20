import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

import {
  ContentHeader,
  ContentPlaceholder,
} from "../../../features/modules/components";
import getServerSideAuth from "../../../lib/getServerSideAuth";

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

export const getServerSideProps = getServerSideAuth;

export default Customers;
