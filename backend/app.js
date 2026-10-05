const express = require("express");
const cors = require("cors");

const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "HealthHand API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
