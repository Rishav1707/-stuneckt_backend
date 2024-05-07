import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/user";
import { ResponseStatus } from "../utils/responseStatus";
import { createPostValidation } from "../utils/validation";
import { Post } from "../models/posts";

const router = express.Router();

router.post("/create", authMiddleware, async (req: any, res: Response) => {
  try {
    const validInput = createPostValidation(req.body);
    if (!validInput) {
      res.status(ResponseStatus.BadRequest).json({ message: "Invalid inputs" });
      return;
    }

    await Post.create({
      userId: req.userId,
      image: req.body.image,
      title: req.body.title,
      content: req.body.content,
    });

    res
      .status(ResponseStatus.Created)
      .json({ message: "Post created successfully" });
  } catch (error: any) {
    res
      .status(ResponseStatus.InternalServerError)
      .json({ message: "Error while creating post", error: error.message });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const allPosts = await Post.find({});
    res
      .status(ResponseStatus.Success)
      .json({ length: allPosts.length, Posts: allPosts });
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while fetching all posts",
      error: error.message,
    });
  }
});

router.get("/myPosts", authMiddleware, async (req: any, res: Response) => {
  try {
    const Posts = await Post.find({ userId: req.userId });
    if (Posts.length === 0) {
      res
        .status(ResponseStatus.NotFound)
        .json({ message: "No posts found for this user" });
      return;
    }
    res.status(ResponseStatus.Success).json({ length: Posts.length, Posts });
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while fetching user posts",
      error: error.message,
    });
  }
});

export default router;
