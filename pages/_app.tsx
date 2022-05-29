import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import SidebarLayout from "../components/layout/SidebarLayout";
import store from "../redux/store";
import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  // Otherwise, use the Single Shared Layout with Sidebar as default
  const getLayout =
    Component.getLayout ?? ((page) => <SidebarLayout>{page}</SidebarLayout>);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </Fragment>
  );
}

export default MyApp;
