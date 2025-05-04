const express = require('express');
const cors = require("cors");
const connectDB = require('./database/connect');
const app = express();
const nodemailer = require("nodemailer");
const authRouter = require("./routes/auth-route");
const enrollmentRouter = require("./routes/enroll-route");

connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/enrollments", enrollmentRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});