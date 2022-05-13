import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import AddSalesForm from "../../components/sales/AddSalesForm";
import TransactionsGrid from "../../components/sales/TransactionsGrid";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setShowAddDialog } from "../../redux-store/slices/salesSlice";

const TABLE_HEADERS = [
  { label: "ID" },
  { label: "Description" },
  { label: "Added by" },
  { label: "Total" },
  { label: "Transaction Date" },
];

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

const Sales: NextPage = () => {
  const dispatch = useAppDispatch();
  const showAddDialog = useAppSelector((state) => state.sales.showAddDialog);

  return (
    <Fragment>
      <Head>
        <title>All Sales | Zyamura</title>
      </Head>
      <MuiModal
        showModal={showAddDialog}
        onClose={() => dispatch(setShowAddDialog(false))}
      >
        <AddSalesForm />
      </MuiModal>

      {/* <SalesReport /> */}

      {/* All Sales */}
      <ActionsHeader
        sortItems={SORT_QUERIES}
        selectedQuery={SORT_QUERIES[2]}
        title="All Sales"
        onAddHandler={() => {
          dispatch(setShowAddDialog(true));
        }}
        // onSortHandler={() => {}}
      />
      <TableHeader items={TABLE_HEADERS} />
      {/* Sales Table */}
      <TransactionsGrid />
    </Fragment>
  );
};

export default Sales;
