const express = require("express");
const cors = require("cors");

const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");
const clinicRoutes = require("./server/routes/clinicRoutes");
const testRoutes = require("./server/routes/testRoutes");
const bookingRoutes = require("./server/routes/bookingRoutes");

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://health-hand-frontend.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // important if you ever send cookies
    optionsSuccessStatus: 200, // some older browsers choke on 204
  }),
);

app.use(express.json());

// Health check
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
