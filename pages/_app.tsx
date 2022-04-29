import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import store from "../redux-store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
