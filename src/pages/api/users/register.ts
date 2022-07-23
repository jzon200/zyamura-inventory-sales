import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";

import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_KEY!, {
        expiresIn: "1d",
      });

      setCookie({ res }, "token", token, {
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
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
