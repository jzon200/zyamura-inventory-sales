import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { MdFilterList } from "react-icons/md";
import TitleHeader from "../../components/layout/TitleHeader";
import TransactionsGrid from "../../components/sales/SalesTable";
import Dropdown from "../../components/UI/Dropdown";

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
  return (
    <Fragment>
      <Head>
        <title>Sales | Zyamura Mix Petshop Inventory & Sales System</title>
      </Head>

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
      <TransactionsGrid />
    </Fragment>
  );
};

export default Sales;
