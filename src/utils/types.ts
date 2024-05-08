import { Types } from "mongoose";

interface UserType {
  profileImg?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  about: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}

interface CommentType {
  userId: Types.ObjectId;
  content: string;
}

interface PostType {
  userId: Types.ObjectId;
  image?: string;
  title: string;
  content: string;
  likes: Types.ObjectId[];
  comments: CommentType[];
}

interface signupType {
  profileImg?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  about: string;
}

interface signinType {
  username: string;
  password: string;
}

interface updateProfileType {
  profileImg?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  about: string;
}

interface createPostType {
  userId: Types.ObjectId;
  image?: string;
  title: string;
  content: string;
}

export {
  UserType,
  CommentType,
  PostType,
  signupType,
  signinType,
  updateProfileType,
  createPostType,
};
