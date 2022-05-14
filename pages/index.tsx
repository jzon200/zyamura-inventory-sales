import Head from "next/head";
import { ReactElement } from "react";

const Login = () => {
  return <div>Login</div>;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Login | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <div className="bg-red-500 h-screen">{page}</div>
    </>
  );
};

export default Login;
