const express = require("express");
// const protect = require("../middleware/atuhMiddleware");
const { createClinic } = require("../controller/clinicController");

const router = express.Router();

router.post("/createClinic", createClinic);

module.exports = router;
