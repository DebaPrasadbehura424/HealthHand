const express = require("express");
const cors = require("cors");

const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");
const clinicRoutes = require("./server/routes/clinicRoutes");
const testRoutes = require("./server/routes/testRoutes");
const bookingRoutes = require("./server/routes/bookingRoutes");

const app = express();
const allowed = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(
  Boolean,
);

app.use(
  cors({
    origin: allowed,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "HealthHand API is running",
    status: "deployed successfully",
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
