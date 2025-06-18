require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./configs/db");
const { unfreezeUsersJob }=require("./configs/CronJob");

// Connect to MongoDB
connectDB();

// Import routes
const authRouter=require("./routes/authRoutes")
const stateRouter=require("./routes/stateRoutes");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start node-cron
unfreezeUsersJob.start()

// Routes
app.use("/api/auth",authRouter)
app.use("/api/state", stateRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
