import { FiSearch } from "react-icons/fi";

import CategoriesList from "./CategoriesList";
import InventoryGrid from "./InventoryGrid";

export default function MainLayout() {
  return (
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
  );
}
