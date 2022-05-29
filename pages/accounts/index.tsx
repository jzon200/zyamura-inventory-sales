import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ContentPlaceholder from "../../components/common/ContentPlaceholder";
import SectionTitle from "../../components/header/SectionTitle";

const Accounts: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Accounts | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <SectionTitle title="Accounts" className="mt-4" />
      <ContentPlaceholder />
    </Fragment>
  );
};

export default Accounts;
