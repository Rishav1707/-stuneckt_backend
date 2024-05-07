import { Response, NextFunction } from "express";
import { ResponseStatus } from "../utils/responseStatus";
import { verifyToken } from "../utils/auth";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const auth: string = req?.headers?.authorization || " ";
    if (!auth || !auth.startsWith("Bearer ")) {
      res
        .status(ResponseStatus.Forbidden)
        .json({ message: "Headers are not there" });
      return;
    }
    const token = auth.split(" ")[1];

    const decodedToken = verifyToken(token);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(ResponseStatus.UnauthorizedError).json({
      message: "Unauthorized user",
      error: error,
    });
  }
};

export { authMiddleware };
