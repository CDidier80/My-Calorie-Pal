const AppRouter = require("./routes/AppRouter");
const connection = require("./db/connection");

const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");

// Require Middleware
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// Require Middleware

// Initialize Middlewarenpx dt
app.use(logger("dev"));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));
// Initialize Middleware

app.disable("X-Powered-By");

app.use("/api", AppRouter);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database Connected");
    console.log();
  } catch (error) {
    throw new Error("Connection Error");
  }
});
