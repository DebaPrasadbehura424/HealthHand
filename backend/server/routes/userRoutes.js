const express = require("express");
const protect = require("../middleware/atuhMiddleware");

const router = express.Router();

// GET /api/users/me
router.get("/me", protect, (req, res) => {
  const u = req.user;
  res.json({
    id: u._id,
    fullName: u.fullName,
    email: u.email,
    phone: u.phone,
    photo: u.photo,
  });
});

module.exports = router;
