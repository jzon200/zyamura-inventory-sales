import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import UserCredential from "../../../models/userCredential";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { setCookie } from "nookies";

type Credentials = {
  username: string;
  password: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await dbConnect();

    const { username, password } = req.body;

    const userExist = await UserCredential.findOne({ username });

    if (userExist) {
      return res.status(422).json({ message: "Username is already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserCredential({ username, password: hashedPassword });

    await user.save().catch((error: any) => {
      console.log(error.message);
    });

    // const token = jwt.sign({ userId: user._id }, `${process.env.TOKEN_SECRET}`, {
    //   expiresIn: "1d",
    // });

    // setCookie("token", token, {
    //   req,
    //   res,
    //   maxAge: 60 * 60 * 24, // 1 day
    //   path: "/",
    // });

    res.status(201).json(user);
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
}

export default handler;
