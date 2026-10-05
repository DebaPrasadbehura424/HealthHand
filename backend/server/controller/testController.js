const mongoose = require("mongoose");
const Test = require("../model/Test");
const Clinic = require("../model/Clinic");

exports.createTest = async (req, res) => {
  try {
    const {
      name,
      testType,
      description,
      price,
      parametersCount,
      included,
      isPopular,
      clinicId,
    } = req.body;

    if (!name || !testType || price === undefined || !clinicId) {
      return res
        .status(400)
        .json({ message: "name, testType, price and clinicId are required" });
    }
    if (!["Blood", "Urine", "Stool", "Other"].includes(testType)) {
      return res.status(400).json({ message: "Invalid testType" });
    }
    if (isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ message: "price must be a valid number" });
    }
    if (!mongoose.isValidObjectId(clinicId)) {
      return res.status(400).json({ message: "Invalid clinic id" });
    }

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });

    const exists = await Test.findOne({ clinic: clinicId, name });
    if (exists) {
      return res
        .status(409)
        .json({ message: "This test already exists in this clinic" });
    }

    // 1) store in the Test model, with the clinic reference
    const test = await Test.create({
      name,
      testType,
      description,
      price: Number(price),
      parametersCount,
      included,
      isPopular,
      clinic: clinic._id,
    });

    // 2) add the test id into the clinic's tests array
    await Clinic.findByIdAndUpdate(clinic._id, {
      $addToSet: { tests: test._id },
    });

    res.status(201).json({ message: "Test created and added to clinic", test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
      .populate("clinic", "name address isVerified lat lng")
      .sort({ name: 1 });

    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
