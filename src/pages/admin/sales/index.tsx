import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { MdFilterList } from "react-icons/md";

import {
  DropdownSort,
  SectionTitle,
} from "../../../features/modules/components";
import { initialSort } from "../../../features/modules/store/reducers/firestoreReducer";
import { SalesDataGrid } from "../../../features/modules/sales";
import getServerSideAuth from "../../../lib/getServerSideAuth";
import { useAppDispatch } from "../../../redux/hooks";

const SORT_OBJECTS = {
  priceDesc: {
    label: "Highest Sales",
    sortQuery: orderBy("totalPrice", "desc"),
  },
  priceAsc: {
    label: "Lowest Sales",
    sortQuery: orderBy("totalPrice", "asc"),
  },
  latest: {
    label: "Latest",
    sortQuery: orderBy("dateAdded", "desc"),
  },
};

const Sales: NextPage = () => {
  const dispatch = useAppDispatch();

  dispatch(initialSort());

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
          <DropdownSort items={SORT_OBJECTS} />
          {/* Add Items */}
        </div>
      </div>
      <SalesDataGrid />
    </Fragment>
  );
};

export const getServerSideProps = getServerSideAuth;

export default Sales;
