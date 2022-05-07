import { NextPage } from "next";
import { Fragment } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit, FiShoppingBag } from "react-icons/fi";
import SimpleAreaChart from "../../components/charts/SimpleAreaChart";
import TinyBarChart from "../../components/charts/TinyBarChart";
import TwoWayPieChart from "../../components/charts/TwoWayPieChart";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import TitleHeader from "../../components/layout/TitleHeader";

const TABLE_HEADERS = [
  { label: "Description" },
  { label: "" },
  { label: "Status" },
  { label: "Added by" },
  { label: "Date" },
  { label: "Total" },
  { label: "ACTION" },
];

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
    <div className="h-screen">
      {/* Sales Report */}
      <TitleHeader title="Sales Report" className="mb-4" />
      <div className="grid grid-cols-4 gap-5 select-none">
        <div className="grid grid-rows-3 gap-4">
          <div className="bg-green-500 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="grid place-items-center rounded-lg bg-white w-12 h-12 text-green-500">
                <FiShoppingBag size={32} />
              </div>
              <div className="text-white text-lg font-medium">Total Sales</div>
            </div>
            <div className="ml-16 text-white text-4xl font-medium">
              ₱ 12,500
            </div>
          </div>
          <div className="bg-[#12151C] text-white row-span-2 rounded-2xl p-4">
            <div className="text-lg">Weekly Report</div>
            <div className="text-xs text-gray-400">This week sales</div>
            <div className="text-2xl text-fuchsia-500 font-semibold mb-4">
              ₱ 44,722
            </div>
            <TinyBarChart />
          </div>
        </div>
        <div className="bg-white rounded-2xl col-span-2">
          <SimpleAreaChart />
        </div>
        <div className="bg-slate-900 text-white rounded-2xl w-96 p-4">
          <div className="text-center text-2xl font-semibold">
            Product Percentage
          </div>
          <TwoWayPieChart />
        </div>
      </div>
      {/* All Sales */}
      <ActionsHeader
        sortItems={SORT_QUERIES}
        selectedQuery={SORT_QUERIES[0]}
        className="mt-16"
        title="All Sales"
        onAddHandler={() => {}}
        // onSortHandler={() => {}}
      />
      <TableHeader items={TABLE_HEADERS} />
      {/* Sales Table */}
      <div className="overflow-y-scroll h-96">
        <div className="mt-4 grid grid-cols-7 gap-y-8 text-xl place-items-center select-none text-[#3A512B]">
          <div>Dog food and Cage</div>
          <div></div>
          <div className="chip bg-[#CCF8B3] text-[#1D8F19]">Delivered</div>
          <div>John Doe</div>
          <div>Apr 12, 2022</div>
          <div>₱ 1,400</div>
          <div className="flex gap-4">
            <button title="Edit">
              <FiEdit />
            </button>
            <button title="Delete">
              <BsTrash />
            </button>
          </div>
          <div>Dog food and Cage</div>
          <div></div>
          <div className="chip bg-[#CCF8B3] text-[#1D8F19]">Delivered</div>
          <div>John Doe</div>
          <div>Apr 12, 2022</div>
          <div>₱ 1,400</div>
          <div className="flex gap-4">
            <button title="Edit">
              <FiEdit />
            </button>
            <button title="Delete">
              <BsTrash />
            </button>
          </div>
          <div>Dog food and Cage</div>
          <div></div>
          <div className="chip bg-[#CCF8B3] text-[#1D8F19]">Delivered</div>
          <div>John Doe</div>
          <div>Apr 12, 2022</div>
          <div>₱ 1,400</div>
          <div className="flex gap-4">
            <button title="Edit">
              <FiEdit />
            </button>
            <button title="Delete">
              <BsTrash />
            </button>
          </div>
          <div>Dog food and Cage</div>
          <div></div>
          <div className="chip bg-[#CCF8B3] text-[#1D8F19]">Delivered</div>
          <div>John Doe</div>
          <div>Apr 12, 2022</div>
          <div>₱ 1,400</div>
          <div className="flex gap-4">
            <button title="Edit">
              <FiEdit />
            </button>
            <button title="Delete">
              <BsTrash />
            </button>
          </div>
          <div>Dog food and Cage</div>
          <div></div>
          <div className="chip bg-[#CCF8B3] text-[#1D8F19]">Delivered</div>
          <div>John Doe</div>
          <div>Apr 12, 2022</div>
          <div>₱ 1,400</div>
          <div className="flex gap-4">
            <button title="Edit">
              <FiEdit />
            </button>
            <button title="Delete">
              <BsTrash />
            </button>
          </div>
          <div>Dog food and Cage</div>
          <div></div>
          <div className="chip bg-[#CCF8B3] text-[#1D8F19]">Delivered</div>
          <div>John Doe</div>
          <div>Apr 12, 2022</div>
          <div>₱ 1,400</div>
          <div className="flex gap-4">
            <button title="Edit">
              <FiEdit />
            </button>
            <button title="Delete">
              <BsTrash />
            </button>
          </div>
          <div>Dog food and Cage</div>
          <div></div>
          <div className="chip bg-[#CCF8B3] text-[#1D8F19]">Delivered</div>
          <div>John Doe</div>
          <div>Apr 12, 2022</div>
          <div>₱ 1,400</div>
          <div className="flex gap-4">
            <button title="Edit">
              <FiEdit />
            </button>
            <button title="Delete">
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
