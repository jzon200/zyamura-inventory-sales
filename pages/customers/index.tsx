import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import TableHeader from "../../components/layout/Table";

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
      <div>
        Customers
        <TableHeader items={TABLE_HEADERS} />
      </div>
    </Fragment>
  );
};

export default Customers;
