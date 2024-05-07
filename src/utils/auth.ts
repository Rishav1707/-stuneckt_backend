import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET: Secret = process.env.JWT_SECRET || " ";

const generateToken = (payload: any) => {
  return jwt.sign({ userId: payload }, JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

const hashPassword = async (password: string) => {
  const saltRounds: number = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { generateToken, verifyToken, hashPassword, comparePasswords };
