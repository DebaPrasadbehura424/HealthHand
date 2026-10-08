const express = require("express");
const { createClinic } = require("../controller/clinicController");

const router = express.Router();

router.post("/createClinic", createClinic);
router.get("/getall_clinics", getAllClinics);
router.get("getby_id/:id", protect, getClinicById);

module.exports = router;
