import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import TableHeader from "../../components/layout/Table";

const TABLE_HEADERS = [
  { label: "" },
  { label: "Employee ID" },
  { label: "Name" },
  { label: "Contact number" },
  { label: "Email" },
  { label: "Role" },
  { label: "Action " },
];

const Employees: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Employees | Zyamura Inventory & Sales</title>
      </Head>
      <div>
        Employees
        <TableHeader items={TABLE_HEADERS} />
      </div>
    </Fragment>
  );
};

export default Employees;
