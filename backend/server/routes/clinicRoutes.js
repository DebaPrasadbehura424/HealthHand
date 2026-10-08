const express = require("express");
const {
  createClinic,
  getAllClinics,
  getClinicById,
} = require("../controller/clinicController");

const router = express.Router();

router.post("/createClinic", createClinic);
router.get("/getall_clinics", getAllClinics);
router.get("getby_id/:id", getClinicById);

module.exports = router;
