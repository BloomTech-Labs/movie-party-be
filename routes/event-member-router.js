import db from "../config/dbConfig";
require("dotenv").config();

const router = require("express").Router();
const ENVIRONMENT = process.env.ENVIRONMENT;

router.get("/", async (req, res) => {
  try {
    const member = await db("event_members");
    return res.status(200).json(member);
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
    const { event_id, users_id } = req.body;

    if (!event_id && !users_id) {
      return res
        .status(401)
        .json({ error: true, message: "Need required items" });
    }

    const member = await db("event_members").insert(req.body);
    return res.status(201).json({ id: member[0] });
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

    const result = await db("event_members").where({ id: id }).del();
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
        .json({ error: true, message: "Error deleting the event_member" });
    }
  }
});

module.exports = router;
