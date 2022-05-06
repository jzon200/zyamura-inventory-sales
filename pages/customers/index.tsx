import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";

const TABLE_HEADERS = [
  { label: "" },
  { label: "ID" },
  { label: "Username" },
  { label: "Name" },
  { label: "Email" },
  { label: "Address" },
  { label: "Mobile number" },
];

const Customers: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Customers | Zyamura Inventory & Sales</title>
      </Head>
      <ActionsHeader title="Customers" onAddHandler={() => {}} />
      <TableHeader items={TABLE_HEADERS} />
    </Fragment>
  );
};

export default Customers;
