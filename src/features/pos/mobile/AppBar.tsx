import { FiSearch } from "react-icons/fi";
import { MdMenu, MdPets } from "react-icons/md";

import { CategoriesList } from "../components";

export default function AppBar() {
  return (
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
  );
}
