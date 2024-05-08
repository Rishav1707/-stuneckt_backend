import { Request, Response } from "express";
import { ResponseStatus } from "../utils/responseStatus";
import { User } from "../models/user";
import { comparePasswords, generateToken, hashPassword } from "../utils/auth";
import {
  signinValidation,
  signupValidation,
  updateValidation,
} from "../utils/validation";

const userSignup = async (req: Request, res: Response) => {
  try {
    const validInput: boolean = signupValidation(req.body);
    if (!validInput) {
      res.status(ResponseStatus.BadRequest).json({ message: "Invalid inputs" });
      return;
    }

    const userAlreadyExists = await User.findOne({
      username: req.body.username,
    });
    if (userAlreadyExists) {
      res
        .status(ResponseStatus.BadRequest)
        .json({ message: "User already exists, try different username" });
      return;
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      about: req.body.about,
    });

    const token = generateToken(newUser._id);

    res
      .status(ResponseStatus.Created)
      .json({ message: "User Created Successfully", token: token });
  } catch (error: any) {
    res
      .status(ResponseStatus.InternalServerError)
      .json({ message: "Error while signing up.", error: error.message });
  }
};

const userSignin = async (req: Request, res: Response) => {
  try {
    const validInput = signinValidation(req.body);
    if (!validInput) {
      res
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid inputs." });
      return;
    }

    const userExists = await User.findOne({ username: req.body.username });
    if (!userExists) {
      res
        .status(ResponseStatus.Forbidden)
        .json({ message: "User doesn't exist, Register yourself first." });
      return;
    }

    const isPasswordValid = await comparePasswords(
      req.body.password,
      userExists.password
    );
    if (!isPasswordValid) {
      res
        .status(ResponseStatus.UnauthorizedError)
        .json({ message: "Invalid username or password." });
      return;
    }

    const token = generateToken(userExists._id);
    res.status(ResponseStatus.Success).json({ token: token });
  } catch (error: any) {
    res
      .status(ResponseStatus.InternalServerError)
      .json({ message: "Error while signing in.", error: error.message });
  }
};

const userProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      res
        .status(ResponseStatus.UnauthorizedError)
        .json({ message: "User not found, Invalid User" });
      return;
    }
    res.status(ResponseStatus.Success).json(user);
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while fetching user profile",
      error: error.message,
    });
  }
};

const userFollowers = async (req: any, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const user = await User.findById(req.userId, { followers: 1 }).populate({
      path: "followers",
      select: { password: 0 },
      options: {
        limit: limit,
        skip: (page - 1) * limit,
      },
    });

    if (!user) {
      res
        .status(ResponseStatus.UnauthorizedError)
        .json({ message: "User not found, Invalid User" });
      return;
    }

    res.status(ResponseStatus.Success).json({
      currentPage: page,
      totalPages: Math.ceil(user.followers.length / limit),
      totalFollowers: user.followers.length,
      followers: user.followers,
    });
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while fetching followers",
      error: error.message,
    });
  }
};

const userUpdateProfile = async (req: any, res: Response) => {
  try {
    const validInput = updateValidation(req.body);
    if (!validInput) {
      res.status(ResponseStatus.BadRequest).json({ message: "Invalid inputs" });
      return;
    }

    const updatedHashedPassword = await hashPassword(req.body.password);

    await User.findByIdAndUpdate(req.userId, {
      username: req.body.username,
      password: updatedHashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      about: req.body.about,
    });

    res
      .status(ResponseStatus.Success)
      .json({ message: "Profile updated successfully" });
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while updating profile",
      error: error.message,
    });
  }
};

const userFollowAnotheruser = async (req: any, res: Response) => {
  try {
    const fromUser = await User.findById(req.userId);
    if (!fromUser) {
      res
        .status(ResponseStatus.UnauthorizedError)
        .json({ message: "Invalid User" });
      return;
    }

    const toUser = await User.findById(req.params.userId);
    if (!toUser) {
      res
        .status(ResponseStatus.Forbidden)
        .json({ message: "Invalid Params UserId" });
      return;
    }

    if (fromUser.following.includes(toUser._id)) {
      res
        .status(ResponseStatus.BadRequest)
        .json({ message: "You are already following this user" });
      return;
    }

    await User.findByIdAndUpdate(fromUser._id, {
      $addToSet: { following: toUser._id },
    });
    await User.findByIdAndUpdate(toUser._id, {
      $addToSet: { followers: fromUser._id },
    });

    res.status(ResponseStatus.Success).json({ message: "User followed" });
  } catch (error: any) {
    res.status(ResponseStatus.InternalServerError).json({
      message: "Error while following user",
      error: error.message,
    });
  }
};

export {
  userSignup,
  userSignin,
  userProfile,
  userFollowers,
  userUpdateProfile,
  userFollowAnotheruser,
};
