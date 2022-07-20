import { GetServerSideProps } from "next/types";

import getUser from "./getUser";

const getServerSideAuth: GetServerSideProps = async (context) => {
  const user = await getUser(context);

  if (user == null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  // if (user.isAdmin) {
  //   return {
  //     redirect: {
  //       destination: "/admin/dashboard",
  //       permanent: false,
  //     },
  //     props: {},
  //   };
  // }

  // if (!user.isAdmin) {
  //   return {
  //     redirect: {
  //       destination: "/point-of-sales",
  //       permanent: false,
  //     },
  //     props: {},
  //   };
  // }

  return {
    props: {},
  };
};

export default getServerSideAuth;
