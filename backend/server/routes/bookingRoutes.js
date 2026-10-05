const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controller/bookingController");

const router = express.Router();

router.use(protect); // every booking route needs a logged-in user

router.post("/", createBooking);
router.get("/", getMyBookings);
router.put("/:id/cancel", cancelBooking);

module.exports = router;
