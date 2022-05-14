import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import TitleHeader from "../../components/layout/TitleHeader";
import EmptyPlaceholder from "../../components/UI/EmptyPlaceholder";

const Accounts: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Accounts | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <TitleHeader title="Accounts" className="mt-4" />
      <EmptyPlaceholder />
    </Fragment>
  );
};

export default Accounts;
