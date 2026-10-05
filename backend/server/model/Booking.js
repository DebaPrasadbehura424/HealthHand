const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },

    // copied at booking time, so old bookings never change
    testName: { type: String, required: true },
    testType: { type: String, required: true },
    clinicName: { type: String, required: true },
    amount: { type: Number, required: true },

    collectionType: {
      type: String,
      enum: ["Home Collection", "Visit Lab"],
      required: true,
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    address: { type: String, default: "" },
    instructions: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Scheduled", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
