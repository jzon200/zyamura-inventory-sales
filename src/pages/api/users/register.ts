import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Credential, PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";
import { setCookie } from "nookies";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    // await prisma.credential.delete({ where: { username: "admin" } });

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // let newUser: Credential = {
    //   id: "",
    //   password: "",
    //   username: "",
    //   isAdmin: false,
    // };

    try {
      const newUser = await prisma.credential.create({
        data: {
          username: username,
          password: hashedPassword,
          isAdmin: username === "admin",
        },
      });

      res.status(201).json(newUser);
    } catch (err) {
      const errorMessage = (err as Error).message;
      res.status(422).json({ message: errorMessage });
    } finally {
      prisma.$disconnect;
    }
  } else {
    res.status(405).json({ message: "Invalid method!" });
  }
}

export default handler;
