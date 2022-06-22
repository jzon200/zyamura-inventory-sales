import jwt, { JwtPayload } from "jsonwebtoken";
import { parseCookies } from "nookies";
import UserCredential from "../models/userCredential";

export default async function getUser(context) {
  const { token } = parseCookies(context);

  try {
    const data = jwt.verify(token, `${process.env.JWT_KEY}`);

    let user = await UserCredential.findById(data.userId);
    user = JSON.parse(JSON.stringify(user));

    return user;
  } catch (error) {
    return null;
  }
}
