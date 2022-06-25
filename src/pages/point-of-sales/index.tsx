import Head from "next/head";
import Image from "next/image";
import { Fragment, ReactElement } from "react";
import { FiSearch } from "react-icons/fi";
import { MdMenu, MdPets } from "react-icons/md";
import getEmployeeAuth from "../../../constants/getEmployeeAuth";
import BillsList from "../../components/pages/pos/BillsList";
import CategoriesList from "../../components/pages/pos/CategoriesList";
import InventoryGrid from "../../components/pages/pos/InventoryGrid";
import { useAppSelector } from "../../redux/hooks";

const PointOfSales = () => {
  const purchasedItems = useAppSelector((state) => state.pos.purchasedItems);

  const totalQuantity = purchasedItems
    .map((item) => item.quantity)
    .reduce((previousValue, currentValue) => {
      if (isNaN(currentValue)) {
        return previousValue;
      }
      return previousValue + currentValue;
    }, 0);

  return (
    <Fragment>
      <div className="grid lg:mx-12 lg:gap-14 lg:mt-4 lg:grid-cols-3">
        {/* App Bar */}
        <div className="relative h-44 lg:hidden">
          <div className="fixed left-0 z-20">
            <div className="w-screen h-24 text-white bg-blue-500 p-4">
              <div className="flex justify-between items-center">
                <MdMenu size={24} />
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-medium">Zyamura</div>
                  <MdPets size={24} />
                </div>
                <FiSearch size={24} />
              </div>
            </div>
            <CategoriesList />
          </div>
        </div>
        <main className="col-span-2 overflow-hidden">
          <div className="hidden lg:flex justify-between items-center mb-4">
            <div className="text-4xl font-medium">Point of Sales</div>
            <div className="relative w-full max-w-md">
              <input
                className="w-full rounded-xl px-4 py-3 border border-gray-500
                focus:outline-blue-500 placeholder:text-lg placeholder:text-[#94A3B8] placeholder:font-medium"
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
      {/* FAB */}
      <button className="fixed lg:hidden bottom-8 right-2 grid place-items-center w-20 h-20 rounded-3xl bg-emerald-300 text-white shadow-md shadow-gray-400/80">
        <Image
          src={"/icons/ic-cash-register.png"}
          width={52}
          height={52}
          alt=""
        />
        <div className="absolute grid place-items-center top-0 right-0 px-1 h-5 rounded-full bg-red-400 text-white text-sm">
          {totalQuantity > 1000 ? "999+" : totalQuantity}
        </div>
      </button>
    </Fragment>
  );
};

PointOfSales.getLayout = function getLayout(page: ReactElement) {
  return (
    <Fragment>
      <Head>
        <title>Point of Sales | Zyamura Mix Pet Shop</title>
      </Head>
      {page}
    </Fragment>
  );
};

export const getServerSideProps = getEmployeeAuth;

export default PointOfSales;
