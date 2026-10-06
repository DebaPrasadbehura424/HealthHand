const express = require("express");
const protect = require("../middleware/atuhMiddleware");
const {
  createTest,
  getAllTests,
  getTestById,
} = require("../controller/testController");

const router = express.Router();

router.post("/create_test", createTest);
router.get("/all", getAllTests);
router.get("/:id", getTestById); // public: one test

module.exports = router;
