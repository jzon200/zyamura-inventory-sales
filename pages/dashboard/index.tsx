import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { FiBox } from "react-icons/fi";
import TitleHeader from "../../components/layout/TitleHeader";
import SalesReport from "../../components/sales/SalesReport";

const Dashboard: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Dashboard | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <TitleHeader title="Sales Overview" className="my-4" />
      <SalesReport />
      <TitleHeader title="Products Overview" className="mt-12 mb-4" />
      <div className="w-64 bg-purple-500 rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="grid place-items-center rounded-lg bg-white w-12 h-12 text-purple-500">
            <FiBox size={32} />
          </div>
          <div className="text-white text-lg font-medium">All Products</div>
        </div>
        <div className="ml-16 text-white text-4xl font-medium">246</div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
