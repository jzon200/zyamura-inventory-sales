import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

import dbConnect from "../../../lib/dbConnect";
import UserCredential from "../../../models/userCredential";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await dbConnect();

    const { username, password } = req.body;

    const existingUser = await UserCredential.findOne({ username });

    if (existingUser == null) {
      return res.status(403).json({ message: "User does not exist!" });
    }

    //* checks if the requested password matches the hashed password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res
        .status(403)
        .json({ message: "Email and Password doesn't match!" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      `${process.env.JWT_KEY}`,
      {
        expiresIn: "1d",
      }
    );

    setCookie({ res }, "token", token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    res.status(200).json({ userId: existingUser._id, username, token });
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
}

export default handler;
