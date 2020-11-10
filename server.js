const AppRouter = require("./routes/AppRouter");
const connection = require("./db/connection");

const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// Require Middleware
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// Require Middleware

// Initialize Middlewarenpx dt
app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Middleware

app.get("/", (req, res) => res.send({ msg: "Server Working!" }));
app.use("/api", AppRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database Connected");
    console.log();
  } catch (error) {
    throw new Error("Connection Error");
  }
});
