import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";

const app = express();

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

const __dirname = path.resolve();

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: "sucess",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "sucess",
    data: {
      tour,
    },
  });
};

const createTour = async (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "sucess",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  const { duration } = req.body;
  tour.duration = duration;

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const id = req.params.id * 1;
  tours = tours.filter((el) => el.id !== id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const getUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const updateUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const deleteUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const createUser = (req, res) => {
  return res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// 3) ROUTES
// optional parameter: "/api/v1/tours/:id/:x/:y?" -> y é opcional

const tourRouter = express.Router();
app.use("/api/v1/tours", tourRouter);

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

const userRouter = express.Router();
app.use("/api/v1/users", userRouter);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// 4 START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
