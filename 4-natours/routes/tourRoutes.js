import express from "express";
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkBody,
} from "../controllers/tourController.js";

const router = express.Router();

// CREATE A CHECK BODY MIDDLEWARE
// CHECK IF BODY CONTAINS THE NAME AND PRICE PROPERTY
// IF NOT, SEN BACK 400 (BAD REQUEST)

// router.param("id", checkId);

router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;
