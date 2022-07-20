import type { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import * as jwt from "jsonwebtoken";

import prisma from "./prisma";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export default async function getUser(context: GetServerSidePropsContext) {
  try {
    const { token } = parseCookies(context);

    const data = <jwt.UserIDJwtPayload>jwt.verify(token, process.env.JWT_KEY!);

    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
