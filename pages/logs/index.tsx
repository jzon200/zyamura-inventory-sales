import Head from "next/head";
import { Fragment } from "react";
import TitleHeader from "../../components/layout/TitleHeader";

const Logs = () => {
  return (
    <Fragment>
      <Head>
        <title>Logs | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <TitleHeader title="Logs" className="mt-4" />
    </Fragment>
  );
};

export default Logs;
