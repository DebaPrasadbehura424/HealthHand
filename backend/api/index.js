require("dotenv").config();

const app = require("../app");
const connectDB = require("../server/database/db");

let connected = false;

module.exports = async (req, res) => {
  try {
    if (!connected) {
      await connectDB();
      connected = true;
    }
    return app(req, res); // let Express (and cors) handle everything, including OPTIONS
  } catch (err) {
    console.error("Function error:", err.message);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Server error", error: err.message }));
  }
};
