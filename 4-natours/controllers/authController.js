import User from "./../models/userModel.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const signup = catchAsync(async (req, res, next) => {
  // Para criação de usuários é necessário especificar os parâmetros para não vir nenhuma informação suspeita
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and passsword exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password!"), 400);
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password"); // + usa quando campo esta com "select: false" no userModel

  console.log(user);

  // melhor ser vago para não saber se é o usuário ou senha incorreta
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  console.log(user);
  // 3) Everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
