import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { MdFilterList } from "react-icons/md";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import TitleHeader from "../../components/layout/TitleHeader";
import AddSalesForm from "../../components/sales/AddSalesForm";
import TransactionsGrid from "../../components/sales/TransactionsGrid";
import Dropdown from "../../components/UI/Dropdown";
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
      <div className={`flex justify-between items-center text-lg`}>
        <TitleHeader className="basis-48" title={"All Sales"} />
        {/* Search */}
        <div className="w-full flex justify-end gap-8">
          <div className="basis-96 flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="max-h-14 w-full rounded-l-2xl p-4"
            />
            <button className="flex items-center gap-2 px-4 py-[14px] rounded-r-2xl font-medium bg-[#D1CEB2]">
              Filters
              <MdFilterList size={24} />
            </button>
          </div>
          {/* <SortProducts /> */}
          <Dropdown items={SORT_QUERIES} selectedQuery={SORT_QUERIES[2]} />
          {/* Add Items */}
        </div>
      </div>
      <TableHeader items={TABLE_HEADERS} />
      {/* Sales Table */}
      <TransactionsGrid />
    </Fragment>
  );
};

export default Sales;
