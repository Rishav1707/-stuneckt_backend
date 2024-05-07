import mongoose from "mongoose";
import { PostType } from "../utils/types";

const PostScehma = new mongoose.Schema<PostType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: "https://rb.gy/08vmzv",
  },
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  content: {
    type: String,
    required: true,
    maxLength: 500,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
        maxLength: 100,
      },
    },
  ],
});

const Post = mongoose.model<PostType>("Post", PostScehma);
export { Post };
