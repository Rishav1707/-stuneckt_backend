import zod from "zod";
import {
  signupType,
  signinType,
  updateProfileType,
  createPostType,
} from "./types";

const signupValidation = (obj: signupType) => {
  const schema = zod.object({
    profileImg: zod.string().optional(),
    username: zod.string().min(3).email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
    about: zod.string().max(500),
  });

  const response = schema.safeParse(obj);
  return response.success;
};

const signinValidation = (obj: signinType) => {
  const schema = zod.object({
    username: zod.string().min(3).email(),
    password: zod.string().min(6),
  });

  const response = schema.safeParse(obj);
  return response.success;
};

const updateValidation = (obj: updateProfileType) => {
  const schema = zod.object({
    profileImg: zod.string().optional(),
    username: zod.string().min(3).email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
    about: zod.string().max(500),
  });

  const response = schema.safeParse(obj);
  return response.success;
};

const createPostValidation = (obj: createPostType) => {
  const schema = zod.object({
    image: zod.string().optional(),
    title: zod.string().max(100),
    content: zod.string().max(500),
  });

  const response = schema.safeParse(obj);
  return response.success;
};

export {
  signupValidation,
  signinValidation,
  updateValidation,
  createPostValidation,
};
