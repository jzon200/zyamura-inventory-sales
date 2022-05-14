import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";

const SORT_QUERIES: ProductQuery[] = [
  {
    sortQuery: "priceAsc",
    label: "Lowest Price",
  },
  {
    sortQuery: "priceDesc",
    label: "Highest Price",
  },
  {
    sortQuery: "latest",
    label: "Latest",
  },
];

const Expenses: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Expenses | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <ActionsHeader
        title="Expenses"
        sortItems={SORT_QUERIES}
        selectedQuery={SORT_QUERIES[0]}
        onAddHandler={() => {}}
      />
    </Fragment>
  );
};

export default Expenses;
