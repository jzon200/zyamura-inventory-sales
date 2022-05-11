import { ReactElement } from "react";
import { FiSearch } from "react-icons/fi";
import CategoriesList from "../../components/pos/CategoriesList";
import InventoryGrid from "../../components/pos/InventoryGrid";
import Image from "next/image";

const PointOfSales = () => {
  return (
    <div className="flex gap-14 w-[90%] m-auto mt-4">
      <main>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-4xl font-medium">Point of Sales</div>
            <div className="flex items-center">
              <input
                className="w-[35rem] rounded-xl px-4 py-3 border border-gray-500 
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
        <div className="mt-1 ml-4 text-4xl font-medium">Bills</div>
        <div className="relative h-[697px] my-6 px-11 py-2 rounded-3xl border border-gray-500">
          {/* List Tile */}
          <div className="flex items-center gap-3">
            <Image
              className="rounded-lg"
              src={
                "https://firebasestorage.googleapis.com/v0/b/zyamura-capstone.appspot.com/o/products%2Fimages%2Fgoldfish.jpg?alt=media&token=1c60b860-79d7-4c54-9c40-4ac6267ede68"
              }
              width={96}
              height={96}
              quality={100}
              objectFit="cover"
            />
            <div className="grow">
              <div className="text-lg font-medium">
                Goldfish <span className="text-xs text-gray-500">#b855</span>
              </div>
              <div className="rounded-md px-2 py-1 bg-blue-500 text-blue-50 w-fit">
                Fish
              </div>
              <div className="mt-4 flex justify-between text-lg font-medium">
                <div>x1</div>
                <div>P 1,200.00</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 flex justify-between w-96 text-lg font-semibold">
            <div>Total</div>
            <div>P 1,200.00</div>
          </div>
        </div>
        <button
          className="w-full rounded-2xl py-6 text-2xl font-semibold
         bg-blue-500 text-blue-50 hover:bg-blue-400"
        >
          Submit
        </button>
      </aside>
    </div>
  );
};

PointOfSales.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default PointOfSales;
