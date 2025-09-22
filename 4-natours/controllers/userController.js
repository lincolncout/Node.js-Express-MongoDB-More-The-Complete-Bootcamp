import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "sucess",
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

export const getUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const updateUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const deleteUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const createUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
