import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const existingUser = await prisma.user
      .findUnique({
        where: {
          username: username,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });

    if (existingUser == null) {
      return res.status(422).json({ message: "User does not exist!" });
    }

    //* checks if the requested password matches the hashed password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res
        .status(422)
        .json({ message: "Email and Password doesn't match!" });
    }

    const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_KEY!, {
      expiresIn: "1d",
    });

    setCookie({ res }, "token", token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    res.status(200).json({
      userId: existingUser.id,
      username,
      isAdmin: existingUser.isAdmin,
      token,
    });
  } else {
    res.status(405).json({ message: "Invalid method!" });
  }
}

export default handler;
