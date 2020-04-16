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

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "id is required to make a deletion",
      });
    }

    const result = await db("event").where({ id: id }).del();
    return res.status(200).json(result);
  } catch (err) {
    if (ENVIRONMENT === "development") {
      console.log(err);
      return res.json(err);
    } else {
      console.log("Something went wrong!");
      console.log(err);
      return res
        .status(500)
        .json({ error: true, message: "Error deleting the event" });
    }
  }
});

router.put("/", async (req, res) => {
  try {
    const { id, title, description, time, date, organizer } = req.body;

    if ((!id, !title, !description, !time, !date, !organizer)) {
      return res.status(400).json({
        error: true,
        message: "id, title, description, time, date, organizer is required!",
      });
    }

    const processedValues = { title, description, time, date, organizer };

    const result = await db("event").where({ id: id }).update(processedValues);
    return res.status(200).json(result);
  } catch (err) {
    if (ENVIRONMENT === "development") {
      console.log(err);
      return res.json(err);
    } else {
      console.log("Something went wrong!");
      console.log(err);
      return res
        .status(500)
        .json({ error: true, message: "Error getting the events" });
    }
  }
});

module.exports = router;
