import { ReactElement } from "react";
import { FiSearch } from "react-icons/fi";
import BillsList from "../../components/pos/BillsList";
import CategoriesList from "../../components/pos/CategoriesList";
import InventoryGrid from "../../components/pos/InventoryGrid";

const PointOfSales = () => {
  return (
    <div className="flex gap-14 w-[90%] m-auto mt-1 overflow-hidden">
      <main>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-4xl font-medium">Point of Sales</div>
            <div className="flex items-center">
              <input
                className="w-[32rem] rounded-xl px-4 py-3 border border-gray-500 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                placeholder:text-lg placeholder:text-[#94A3B8] placeholder:font-medium"
                type="text"
                placeholder="Search"
              />
              <FiSearch className="-ml-10" size={26} />
            </div>
          </div>
        </div>

        <CategoriesList />
        <InventoryGrid />
      </main>

      <aside className="grow">
        <BillsList />
      </aside>
    </div>
  );
};

PointOfSales.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
export default PointOfSales;
