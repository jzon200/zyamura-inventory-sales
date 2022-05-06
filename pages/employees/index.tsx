import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { setShowAddDialog } from "../../redux-store/slices/employeesSlice";

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
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <Head>
        <title>Employees | Zyamura Inventory & Sales</title>
      </Head>
      <ActionsHeader
        title="Employees"
        onAddHandler={() => dispatch(setShowAddDialog(true))}
      />
      <TableHeader items={TABLE_HEADERS} />
    </Fragment>
  );
};

export default Employees;
