import React, { Fragment, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import SimpleAreaChart from "../charts/SimpleAreaChart";
import TinyBarChart from "../charts/TinyBarChart";
import TwoWayPieChart from "../charts/TwoWayPieChart";
import TitleHeader from "../layout/TitleHeader";

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

const ANNUAL_SALES = [
  {
    name: "2020",
    "Total sales": 100000,
  },
  {
    name: "2021",
    "Total sales": 125000,
  },
  {
    name: "2022",
    "Total sales": 200000,
  },
];

const SalesReport = () => {
  const [salesData, setSalesData] = useState(WEEKLY_SALES);

  return (
    <Fragment>
      <div className="grid grid-cols-4 gap-5 ">
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
          <div className="bg-[#E5E4DB] row-span-2 rounded-2xl p-4">
            <div className="text-lg">Weekly Report</div>
            <div className="text-gray-400">This week sales</div>
            <div className="text-2xl text-green-500 font-semibold mb-4">
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
                case "annually":
                  setSalesData(ANNUAL_SALES);
                  break;
              }
            }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
          <SimpleAreaChart data={salesData} />
        </div>
        <div className="bg-[#E5E4DB] rounded-2xl p-4">
          <div className="text-center text-2xl font-semibold">
            Product Percentage
          </div>
          <TwoWayPieChart />
        </div>
      </div>
    </Fragment>
  );
};

export default SalesReport;
