const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["Clinic", "Hospital"], default: "Clinic" },
    image: { type: String, default: "" },
    address: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    openTime: { type: String, default: "7:00 AM" },
    closeTime: { type: String, default: "8:00 PM" },
    homeCollection: { type: Boolean, default: true },

    lat: { type: Number, required: true, min: -90, max: 90 },
    lng: { type: Number, required: true, min: -180, max: 180 },

    tests: [
      {
        test: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Test",
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],

    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Clinic", clinicSchema);
