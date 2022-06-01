import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CircularProgressCentered from "../components/common/CircularProgressCentered";
import MuiModal from "../components/common/Modal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/slices/authSlice";
import { setShowLoadingSpinner } from "../redux/slices/uiSlice";

const Login = () => {
  const { register, handleSubmit } = useForm<UserCredentials>();

  const { isAdmin, isLoggedIn } = useAppSelector((state) => ({
    isAdmin: state.auth.isAdmin,
    isLoggedIn: state.auth.isLoggedIn,
  }));
  const dispatch = useAppDispatch();

  const router = useRouter();

  const submitHandler: SubmitHandler<UserCredentials> = (data) => {
    console.log(data);
    dispatch(loginUser(data));

    if (isLoggedIn && isAdmin) {
      router.push("/dashboard");
    } else if (isLoggedIn) {
      router.push("/pos");
    }
  };

  // if (showLoadingSpinner)
  //   return (
  //     <MuiModal showModal={showLoadingSpinner} onClose={() => {}}>
  //       <CircularProgressCentered />
  //     </MuiModal>
  //   );

  return (
    <div className="grid place-items-center h-screen bg-gray-400/50 overflow-hidden">
      <div className="w-full h-full lg:w-[26rem] lg:h-[75%] md:rounded-xl p-5 bg-white shadow-md shadow-zinc-400/80">
        <div className="flex flex-col h-full justify-center">
          <div className="mb-auto">
            <div className="text-2xl font-bold text-center">
              Zyamura Mix Pet Shop
            </div>
            <div className="text-lg font-medium text-center">
              Inventory and Sales
            </div>
          </div>
          <form
            className="mx-4 mt-32 md:mt-0 mb-auto"
            onSubmit={handleSubmit(submitHandler)}
          >
            <label htmlFor="username" className="text-xl font-medium">
              Sign-in
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="form-control-login"
              required
              {...register("username")}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control-login"
              required
              {...register("password")}
            />
            <div className="flex justify-between mt-2 mb-6">
              <div>
                <label htmlFor="rememberPass" className="text-slate-400">
                  Remember me
                </label>
                <input
                  className="inline-block ml-2"
                  type="checkbox"
                  name="rememberPass"
                  id="rememberPass"
                />
              </div>
              <Link href="/" passHref>
                <a className="text-sky-500">Forgot Password?</a>
              </Link>
            </div>
            <button className="w-full rounded-xl p-4 bg-sky-500 hover:bg-sky-400 text-xl text-white font-medium">
              Login
            </button>
          </form>
          <div className="text-center">
            <span className="text-gray-400 mr-2">No Account Yet?</span>
            <Link href="/" passHref>
              <a className="text-sky-500">Register</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Login | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      {page}
    </>
  );
};

export default Login;
