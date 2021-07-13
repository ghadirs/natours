const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");
const { protect } = require("../controllers/authController");

const router = express.Router();

// router.param("id", checkID);

router.route("/").get(protect, getAllTours).post(createTour);
router
  .route("/:id")
  .get(getTour)
  .post(createTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
