import express, { Express, NextFunction, Request, Response } from "express";
import "dotenv/config";
import db from "./config/db";
import rootRouter from "./routes";
import { ResponseStatus } from "./utils/responseStatus";
import cors from "cors";
import seedDummyUser from "./feedDB/dummyUser";
import seedDummyPosts from "./feedDB/dummyPost";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(ResponseStatus.InternalServerError).json({
    message: "Sorry for the inconvenience, we are working on it",
  });
});

// seedDummyUser();
// seedDummyPosts();

app.get("/", (req: Request, res: Response) => {
  res.status(ResponseStatus.Success).json({
    user: "API is available at /api/v1/user",
    posts: "API is available at /api/v1/post",
  });
});

app.use("/api/v1", rootRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(ResponseStatus.NotFound).json({
    message: "Route not found",
    ref: {
      user: "API is available at /api/v1/user",
      posts: "API is available at /api/v1/post",
    },
  });
});

const PORT: number | string = process.env.PORT || 3000;

db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.log("Error while connecting to database");
    console.log(error);
  });
