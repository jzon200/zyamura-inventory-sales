import { GetServerSideProps } from "next";
import dbConnect from "../lib/dbConnect";
import getUser from "../lib/getUser";

const getAdminAuth: GetServerSideProps = async (context) => {
  await dbConnect();

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

  if (user.username !== "admin") {
    return {
      redirect: {
        destination: "/point-of-sales",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default getAdminAuth;
