const express = require("express");
const server = express();

const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users-router.js");
const registerRouter = require("./routes/register-router.js");
const eventRouter = require("./routes/event-route.js");
const memberRoute = require("./routes/event-member-router.js");
const confirmedRoute = require("./routes/confirmed-router.js");

// Middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Routers
server.use("/api/register", registerRouter);
server.use("/api/users", usersRouter);
server.use("/api/event", eventRouter);
server.use("/api/member", memberRoute);
server.use("/api/confirmed", confirmedRoute);

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
