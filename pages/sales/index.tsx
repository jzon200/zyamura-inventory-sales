import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { MdFilterList } from "react-icons/md";
import SortDropdown from "../../components/dropdown/SortDropdown";
import SectionTitle from "../../components/header/SectionTitle";
import TransactionsGrid from "../../components/pages/sales/SalesDataGrid";

const SORT_OBJECTS = {
  priceDesc: {
    label: "Highest Sales",
    queryConstraint: orderBy("totalPrice", "desc"),
  },
  priceAsc: {
    label: "Lowest Sales",
    queryConstraint: orderBy("totalPrice", "asc"),
  },
  latest: {
    label: "Latest",
    queryConstraint: orderBy("dateAdded", "desc"),
  },
};

const Sales: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Sales | Zyamura Mix Petshop Inventory & Sales System</title>
      </Head>

      {/* <SalesReport /> */}

      {/* All Sales */}
      <div className={`flex justify-between items-center text-lg`}>
        <SectionTitle className="basis-48" title={"All Sales"} />
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
          <SortDropdown items={SORT_OBJECTS} />
          {/* Add Items */}
        </div>
      </div>
      <TransactionsGrid />
    </Fragment>
  );
};

export default Sales;
