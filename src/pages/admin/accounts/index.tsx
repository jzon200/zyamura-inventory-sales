import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

import {
  ContentPlaceholder,
  SectionTitle,
} from "../../../features/modules/components";
import getServerSideAuth from "../../../lib/getServerSideAuth";

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

export const getServerSideProps = getServerSideAuth;

export default Accounts;
