const mongoose = require("mongoose");
const Booking = require("../model/Booking");
const Test = require("../model/Test");
const Clinic = require("../model/Clinic");

const TAB_STATUS = {
  upcoming: ["Pending", "Confirmed", "Scheduled"],
  past: ["Completed"],
  cancelled: ["Cancelled"],
};

exports.createBooking = async (req, res) => {
  try {
    const { testId, collectionType, date, timeSlot, address, instructions } =
      req.body;

    if (!testId || !collectionType || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    if (!mongoose.isValidObjectId(testId)) {
      return res.status(400).json({ message: "Invalid test id" });
    }
    if (!["Home Collection", "Visit Lab"].includes(collectionType)) {
      return res.status(400).json({ message: "Invalid collection type" });
    }

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(bookingDate) || bookingDate < today) {
      return res
        .status(400)
        .json({ message: "Please select a valid future date" });
    }

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const clinic = await Clinic.findById(test.clinic);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });

    if (collectionType === "Home Collection") {
      if (!clinic.homeCollection) {
        return res
          .status(400)
          .json({ message: "This clinic has no home collection" });
      }
      if (!address || !address.trim()) {
        return res
          .status(400)
          .json({ message: "Address is required for home collection" });
      }
    }

    const booking = await Booking.create({
      user: req.user._id,
      test: test._id,
      clinic: clinic._id,
      testName: test.name,
      testType: test.testType,
      clinicName: clinic.name,
      amount: test.price, 
      collectionType,
      date: bookingDate,
      timeSlot,
      address: collectionType === "Home Collection" ? address : "",
      instructions: instructions || "",
    });

    await Clinic.findByIdAndUpdate(clinic._id, {
      $addToSet: { bookings: booking._id },
    });

    res
      .status(201)
      .json({ message: "Booking created and added to clinic", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const tab = (req.query.tab || "upcoming").toLowerCase();
    const statuses = TAB_STATUS[tab];
    if (!statuses) return res.status(400).json({ message: "Invalid tab" });

    const bookings = await Booking.find({
      user: req.user._id,
      status: { $in: statuses },
    }).sort({ date: tab === "upcoming" ? 1 : -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (!TAB_STATUS.upcoming.includes(booking.status)) {
      return res
        .status(400)
        .json({ message: `Cannot cancel a ${booking.status} booking` });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
