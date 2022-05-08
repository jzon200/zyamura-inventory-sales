import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import ProductsGrid from "./ProductsGrid";

const AddSalesForm = () => {
  return (
    <div className="w-1/2 m-auto mt-40 select-none">
      <div className="min-w-[64rem] rounded-3xl bg-white px-12 py-6">
        <div className="text-center text-xl text-[#64748B] uppercase font-bold mb-4">
          Add Sales
        </div>
        {/* Actions */}
        <div className="flex gap-5 mb-8">
          <div className="flex grow items-center">
            <input
              className="form-control py-[0.43rem] rounded-r-none"
              type="text"
              placeholder="Search"
            />
            <button className="flex items-center gap-2 px-3 py-2 rounded-r-lg font-medium bg-[#8E9FC5] text-white">
              Filters
              <MdFilterList size={24} />
            </button>
          </div>
          <select
            className="form-control px-2 basis-64"
            name="sortbox"
            id="sort"
          >
            <option value="highestPrice" selected>
              Latest
            </option>
            <option value="highestPrice">Highest Price</option>
            <option value="lowestPrice">Lowest Price</option>
          </select>
          <div className="flex">
            <button className="p-2 rounded-l-lg bg-blue-500">
              <BsGridFill color="white" size={24} />
            </button>
            <button className="p-2 rounded-r-lg border border-slate-500 text-[#8E9FC5]">
              <FaThList size={24} />
            </button>
          </div>
        </div>
        {/* Grid */}
        <ProductsGrid />
        <button className="btn-primary block ml-auto">Submit</button>
      </div>
    </div>
  );
};

export default AddSalesForm;
