import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Fragment, ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

import "../styles/globals.css";
import ModulesLayout from "../features/modules/components/layout/ModulesLayout";
import store from "../redux/store";

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
    Component.getLayout ?? ((page) => <ModulesLayout>{page}</ModulesLayout>);

  return (
    <Fragment>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </Fragment>
  );
}

export default MyApp;
