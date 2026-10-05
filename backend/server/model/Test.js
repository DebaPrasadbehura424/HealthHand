const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    testType: {
      type: String,
      enum: ["Blood", "Urine", "Stool", "Other"],
      required: true,
    },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    parametersCount: { type: Number, default: 0 },
    included: [{ type: String }],
    isPopular: { type: Boolean, default: false },

    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
  },
  { timestamps: true },
);

testSchema.index({ clinic: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Test", testSchema);
