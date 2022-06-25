import Head from "next/head";
import { Fragment } from "react";
import ContentPlaceholder from "../../components/common/ContentPlaceholder";
import SectionTitle from "../../components/header/SectionTitle";
import getAdminAuth from "../../../constants/getAdminAuth";

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

export const getServerSideProps = getAdminAuth;

export default Logs;
