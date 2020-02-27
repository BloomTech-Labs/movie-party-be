const express = require("express");
const server = express();

const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users-router.js");
const registerRouter = require("./routes/register-router.js");

// Middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Routers
server.use("/api/users", usersRouter);
server.use("/api/", registerRouter);

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
