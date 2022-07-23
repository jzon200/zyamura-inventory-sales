import Head from "next/head";
import { Fragment } from "react";

import {
  ContentPlaceholder,
  SectionTitle,
} from "../../../features/modules/components";
import getServerSideAuth from "../../../lib/getServerSideAuth";

const Logs = () => {
  return (
    <Fragment>
      <Head>
        <title>Logs | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <SectionTitle title="Logs" className="mt-4" />
      <ContentPlaceholder />
    </Fragment>
  );
};

export const getServerSideProps = getServerSideAuth;

export default Logs;
