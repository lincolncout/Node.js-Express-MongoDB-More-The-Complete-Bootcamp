import path from "path";
import Tour from "./../models/tourModel.js";

const __dirname = path.resolve();

// 2) ROUTE HANDLERS
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "sucess",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id})

    res.status(200).json({
      status: "sucess",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "sucess",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

export const updateTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // const { duration } = req.body;
  // tour.duration = duration;

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour: tour,
  //   },
  // });
};

export const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  // tours = tours.filter((el) => el.id !== id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
