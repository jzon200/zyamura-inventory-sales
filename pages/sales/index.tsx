import { NextPage } from "next";
import { Fragment, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit, FiShoppingBag } from "react-icons/fi";
import SimpleAreaChart from "../../components/charts/SimpleAreaChart";
import TinyBarChart from "../../components/charts/TinyBarChart";
import TwoWayPieChart from "../../components/charts/TwoWayPieChart";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import TitleHeader from "../../components/layout/TitleHeader";
import AddSalesForm from "../../components/sales/AddSalesForm";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setShowAddDialog } from "../../redux-store/slices/salesSlice";

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

const WEEKLY_SALES = [
  {
    name: "Mon",
    "Total sales": 4000,
  },
  {
    name: "Tue",
    "Total sales": 3000,
  },
  {
    name: "Wed",
    "Total sales": 2000,
  },
  {
    name: "Thu",
    "Total sales": 2780,
  },
  {
    name: "Fri",
    "Total sales": 1890,
  },
  {
    name: "Sat",
    "Total sales": 2390,
  },
  {
    name: "Sun",
    "Total sales": 3490,
  },
];

const MONTHLY_SALES = [
  {
    name: "Jan",
    "Total sales": 20000,
  },
  {
    name: "Feb",
    "Total sales": 15000,
  },
  {
    name: "Mar",
    "Total sales": 13500,
  },
  {
    name: "Apr",
    "Total sales": 12080,
  },
  {
    name: "May",
    "Total sales": 7590,
  },
  {
    name: "Jun",
    "Total sales": 10390,
  },
  {
    name: "Jul",
    "Total sales": 5490,
  },
  {
    name: "Aug",
    "Total sales": 7430,
  },
  {
    name: "Sep",
    "Total sales": 18490,
  },
  {
    name: "Oct",
    "Total sales": 15090,
  },
  {
    name: "Nov",
    "Total sales": 13490,
  },
  {
    name: "Dec",
    "Total sales": 25000,
  },
];

const Sales: NextPage = () => {
  const [salesData, setSalesData] = useState(WEEKLY_SALES);
  const dispatch = useAppDispatch();
  const showAddDialog = useAppSelector((state) => state.sales.showAddDialog);

  console.log(salesData);
  return (
    <Fragment>
      <MuiModal
        showModal={showAddDialog}
        onClose={() => dispatch(setShowAddDialog(false))}
      >
        <AddSalesForm />
      </MuiModal>

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
        <div className="bg-white rounded-2xl col-span-2 p-4">
          <select
            className="ml-auto p-2 block border-2 border-blue-500 focus:outline-none"
            name="salesISO"
            id="salesISO"
            onChange={(event) => {
              switch (event.target.value) {
                case "weekly":
                  setSalesData(WEEKLY_SALES);
                  break;
                case "monthly":
                  setSalesData(MONTHLY_SALES);
                  break;
              }
            }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annually">Annualy</option>
          </select>
          <SimpleAreaChart data={salesData} />
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-4">
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
        onAddHandler={() => dispatch(setShowAddDialog(true))}
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
    </Fragment>
  );
};

export default Sales;
