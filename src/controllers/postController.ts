import { Request, Response } from "express";
import { ResponseStatus } from "../utils/responseStatus";
import { createPostValidation } from "../utils/validation";
import { Post } from "../models/posts";

const createPost = async (req: any, res: Response) => {
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
};

const allPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const posts = await Post.find({})
      .populate("userId")
      .skip((page - 1) * limit)
      .limit(limit);

    if (posts.length === 0) {
      res.status(ResponseStatus.NotFound).json({ message: "No posts found" });
      return;
    }

    const totalPostsCount = await Post.countDocuments();

    res.status(ResponseStatus.Success).json({
      currentPage: page,
      totalPages: Math.ceil(totalPostsCount / limit),
      totalPosts: totalPostsCount,
      posts,
    });
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while fetching all posts",
      error: error.message,
    });
  }
};

const PostsByUser = async (req: any, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const Posts = await Post.find({ userId: req.userId })
      .skip((page - 1) * limit)
      .limit(limit);

    if (Posts.length === 0) {
      res
        .status(ResponseStatus.NotFound)
        .json({ message: "No posts found for this user" });
      return;
    }

    const totalPostsCount = await Post.countDocuments({ userId: req.userId });

    res.status(ResponseStatus.Success).json({
      currentPage: page,
      totalPages: Math.ceil(totalPostsCount / limit),
      totalPosts: totalPostsCount,
      Posts,
    });
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while fetching user posts",
      error: error.message,
    });
  }
};

export { createPost, allPosts, PostsByUser };
