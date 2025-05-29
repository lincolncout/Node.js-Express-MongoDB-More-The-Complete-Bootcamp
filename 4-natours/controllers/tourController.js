import fs from "fs";
import path from "path";

const __dirname = path.resolve();

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS
export const getAllTours = (req, res) => {
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

export const getTour = (req, res) => {
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

export const createTour = async (req, res) => {
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

export const updateTour = (req, res) => {
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

export const deleteTour = (req, res) => {
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
