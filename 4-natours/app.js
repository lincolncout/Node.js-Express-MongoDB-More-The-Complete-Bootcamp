import express from "express";
import morgan from "morgan";

const app = express();

import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

// 1) MIDDLEWARES
// use middlewares (conseguir o body do request)
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the middleware🥋");
  next(); // Importante para não travar a stack
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
// optional parameter: "/api/v1/tours/:id/:x/:y?" -> y é opcional
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
