import Head from "next/head";
import { Fragment, ReactElement } from "react";

// TODO: Customize soon in the production
const Page404 = () => {
  return <h1>404 - Page Not Found</h1>;
};

Page404.getLayout = function getLayout(page: ReactElement) {
  return (
    <Fragment>
      <Head>
        <title>404 Not Found</title>
      </Head>
      {page}
    </Fragment>
  );
};

export default Page404;
