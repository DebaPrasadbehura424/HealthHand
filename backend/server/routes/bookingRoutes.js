const express = require("express");
const protect = require("../middleware/atuhMiddleware");
const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controller/bookingController");

const router = express.Router();

router.use(protect); // every booking route needs a logged-in user

router.post("/createBook", createBooking);
router.get("/get_booking", getMyBookings);
router.put("/:id/cancel", cancelBooking);

module.exports = router;
