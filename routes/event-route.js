import db from "../config/dbConfig";
require("dotenv").config();

const router = require("express").Router();
const ENVIRONMENT = process.env.ENVIRONMENT;

router.get("/", async (req, res) => {
  try {
    const events = await db("event");
    return res.status(200).json(events);
  } catch (err) {
    if (ENVIRONMENT === "development") {
      console.log(err);
      return res.json(err);
    } else {
      console.log("Something went wrong!");
      console.log(err);
      return res
        .status(500)
        .json({ error: true, message: "Error getting events" });
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const { users_id, title, description, time, date, organizer } = req.body;
    console.log(req.body);

    const events = await db("event").insert(req.body);
    return res.status(201).json({ id: events[0] });
  } catch (err) {
    if (ENVIRONMENT === "development") {
      console.log(err);
      return res.json(err);
    } else {
      console.log("Something went wrong!");
      console.log(err);
      return res
        .status(500)
        .json({ error: true, message: "Error adding to the database" });
    }
  }
});

module.exports = router;
