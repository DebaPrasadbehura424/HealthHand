const express = require("express");
const {
  register,
  login,
  getMe,
  updatePassword,
} = require("../controller/authController");
const protect = require("../middleware/atuhMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/update_password", protect, updatePassword);

module.exports = router;
