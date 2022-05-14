import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import TitleHeader from "../../components/layout/TitleHeader";

const Settings: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Settings | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <TitleHeader title="Settings" className="mt-4" />
    </Fragment>
  );
};

export default Settings;
