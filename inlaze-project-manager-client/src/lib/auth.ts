import jwt from "jsonwebtoken";

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    console.log("error verifying jwt", err);
    return null;
  }
};
