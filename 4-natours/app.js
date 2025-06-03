import express from "express";
import morgan from "morgan";
import path from "path";

import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const __dirname = path.resolve();

// 1) MIDDLEWARES
// use middlewares (conseguir o body do request)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

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
