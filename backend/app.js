const express = require("express");
const cors = require("cors");

const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");
const clinicRoutes = require("./server/routes/clinicRoutes");
const testRoutes = require("./server/routes/testRoutes");
const bookingRoutes = require("./server/routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "HealthHand API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
