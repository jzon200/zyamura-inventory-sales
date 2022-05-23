import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import EmptyPlaceholder from "../../components/UI/EmptyPlaceholder";

const TABLE_HEADERS = [
  { label: "" },
  { label: "ID" },
  { label: "Username" },
  { label: "Name" },
  { label: "Email" },
  { label: "Address" },
  { label: "Mobile number" },
];

const SORT_QUERIES: ProductQuery[] = [
  {
    sortQuery: "latest",
    label: "Latest",
  },
  {
    sortQuery: "priceAsc",
    label: "Lowest Price",
  },
  {
    sortQuery: "priceDesc",
    label: "Highest Price",
  },
];

const Customers: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Customers | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <ActionsHeader
        sortItems={SORT_QUERIES}
        selectedQuery={SORT_QUERIES[0]}
        title="Customers"
        onAddHandler={() => {}}
      />
      <EmptyPlaceholder />
    </Fragment>
  );
};

export default Customers;
