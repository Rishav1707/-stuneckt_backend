import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/user";
import {
  userSignup,
  userSignin,
  userProfile,
  userFollowers,
  userUpdateProfile,
  userFollowAnotheruser,
} from "../controllers/userController";

router.post("/signup", userSignup);

router.post("/signin", userSignin);

router.get("/profile", authMiddleware, userProfile);

router.get("/followers", authMiddleware, userFollowers);

router.put("/updateProfile", authMiddleware, userUpdateProfile);

router.put("/follow/:userId", authMiddleware, userFollowAnotheruser);

export default router;
