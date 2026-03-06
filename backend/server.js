require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5005;

console.log("Starting server...");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sdg-quest-5n7s.vercel.app",
    "https://sdg-quest-webapp-bqhp.vercel.app",
    "https://sustainable-dev-quest-ov99usebr-rakhikamboz7.vercel.app"
  ],
  credentials: true,
}));

app.use("/uploads", express.static("uploads"));

console.log("🔧 Loading routes...");

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api", require("./routes/scoreRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));


app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
    timestamp: new Date().toISOString(),
  });
});

app.use("*", (req, res) => {
  console.log("Route not found:", req.method, req.originalUrl);
  res.status(404).json({
    message: "Route not found",
    method: req.method,
    url: req.originalUrl,
    availableRoutes: [
      "GET /",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/auth/user",
      "GET /api/quizzes",
      "POST /api/quizzes",
      "GET /api/scores",
      "POST /api/scores",
      "POST /api/donations",
      "POST /api/admin/users/create-admin",
      "GET /api/admin/users",
      "GET /api/admin/users/:id",
      "PUT /api/admin/users/:id",
      "DELETE /api/admin/users/:id",


    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});