import Head from "next/head";
import { Fragment, ReactElement } from "react";

import { BillsList, MainLayout } from "../../features/pos/components";
import { AppBar, BillsFab } from "../../features/pos/mobile";
import getServerSideAuth from "../../lib/getServerSideAuth";

const PointOfSales = () => {
  return (
    <Fragment>
      <div className="grid lg:mx-12 lg:gap-14 lg:mt-4 lg:grid-cols-3">
        <AppBar />
        <MainLayout />
        <BillsList />
      </div>
      <BillsFab />
    </Fragment>
  );
};

export default PointOfSales;

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

export const getServerSideProps = getServerSideAuth;
