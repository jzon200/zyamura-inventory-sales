import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CircularProgressCentered from "../components/common/CircularProgressCentered";
import MuiModal from "../components/common/Modal";
import dbConnect from "../lib/dbConnect";
// import getUser from "../lib/getUser";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/slices/authSlice";
import { setShowLoadingSpinner } from "../redux/slices/uiSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const { register, reset, handleSubmit } = useForm<UserCredentials>();

  const router = useRouter();

  const submitHandler: SubmitHandler<UserCredentials> = async (formData) => {
    if (loginMode) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw Error(data.message);
        }

        router.push("/dashboard");

        reset();
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch("/api/users/register", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/dashboard");
        console.log(response.json());
      } catch (err) {
        console.log(err);
      }
    }
  };

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
              {isLoading ? (
                <CircularProgressCentered color="inherit" size={24} />
              ) : loginMode ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="text-center">
            <span className="text-gray-400 mr-2">No Account Yet?</span>
            <button
              className="text-sky-500"
              onClick={() => {
                setLoginMode(false);
              }}
            >
              Register
            </button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { token } = parseCookies(context);

    if (token != null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
        props: { token },
      };
    }
  } catch (err) {
    console.log(err);
  }

  return { props: {} };
};

export default Login;
