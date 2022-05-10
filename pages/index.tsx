import { ReactElement } from "react";

const Login = () => {
  return <div>Login</div>;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <div className="bg-red-500 h-screen">{page}</div>;
};

export default Login;
