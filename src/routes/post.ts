import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/user";
import {
  createPost,
  allPosts,
  PostsByUser,
} from "../controllers/postController";

router.post("/create", authMiddleware, createPost);

router.get("/all", allPosts);

router.get("/myPosts", authMiddleware, PostsByUser);

export default router;
