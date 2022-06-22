import Head from "next/head";
import { Fragment, ReactElement } from "react";

// TODO: Customize soon in the production
const Page500 = () => {
  return <h1>500 - Server-side error occurred</h1>;
};

Page500.getLayout = function getLayout(page: ReactElement) {
  return (
    <Fragment>
      <Head>
        <title>500 Server-side error</title>
      </Head>
      {page}
    </Fragment>
  );
};

export default Page500;
