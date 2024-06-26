import express from "express";
import userRoute from "./user";
import postRoute from "./post";

const router = express.Router();

router.use("/user", userRoute);
router.use("/post", postRoute);

export default router;
