import Head from "next/head";
import { ReactElement } from "react";
import { FiSearch } from "react-icons/fi";
import BillsList from "../../components/pos/BillsList";
import CategoriesList from "../../components/pos/CategoriesList";
import InventoryGrid from "../../components/pos/InventoryGrid";

const PointOfSales = () => {
  return (
    <div className="grid place-items-center gap-8 mt-4 overflow-hidden md:place-items-stretch md:mx-12 lg:grid-cols-3">
      <main className="col-span-2">
        <div className="flex justify-between items-center">
          <div className="hidden md:block text-4xl font-medium">
            Point of Sales
          </div>
          <div className="relative w-full max-w-lg mb-4">
            <input
              className="w-full rounded-xl px-4 py-3 border border-gray-500
              focus:outline-blue-500  placeholder:text-lg placeholder:text-[#94A3B8] placeholder:font-medium"
              type="text"
              placeholder="Search"
            />
            <FiSearch className="absolute right-4 top-3" size={24} />
          </div>
        </div>

        <CategoriesList />
        <InventoryGrid />
      </main>

      <aside className="hidden lg:block">
        <BillsList />
      </aside>
    </div>
  );
};

PointOfSales.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Point of Sales | Zyamura Mix Pet Shop</title>
      </Head>
      {page}
    </>
  );
};
export default PointOfSales;
