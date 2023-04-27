const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan")
const cors = require("cors");
const connection = require("./db");
const productRoute = require('./routes/product')
const userRoutes = require("./routes/users");
const paymentRoute = require("./routes/paymentRoute")
const adminRoutes = require("./routes/admin")
const authRoutes = require("./routes/auth");
const { User, validate } = require("./models/user");

// Coinbase setup
// database connection
connection();

// middlewares
app.use(logger("dev"))
app.use(express.json());
app.use(cors());

// routes
app.use("/payment", paymentRoute)
app.use("/api/user", productRoute)
app.use("/api/admin", adminRoutes)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
