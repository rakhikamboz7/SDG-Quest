require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const app = express()
const PORT = 5005
app.options("*", cors());

console.log("Starting server...")

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
app.use("/uploads", express.static("uploads"))


console.log("🔧 Loading routes...")


app.use("/api/auth", require("./routes/authRoutes"))

app.use("/api/quizzes", require("./routes/quizRoutes"))
app.use("/api", require("./routes/scoreRoutes"))
app.use("/api/donations", require("./routes/donationRoutes"))


app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
    timestamp: new Date().toISOString(),
    routes: "Check /test for available routes",
  })
})

app.use("*", (req, res) => {
  console.log("Route not found:", req.method, req.originalUrl)
  res.status(404).json({
    message: "Route not found",
    method: req.method,
    url: req.originalUrl,
    availableRoutes: ["GET /", "GET /test", "POST /login", "POST /register", "POST /create-admin"],
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Server URL: http://localhost:${PORT}`)
})
