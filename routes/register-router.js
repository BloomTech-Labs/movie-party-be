import db from "../config/dbConfig";
import bcjs from "bcryptjs";
import emailValidator from "email-validator";
import { generateToken } from "../utils";
require("dotenv").config();

const router = require("express").Router();
const ENVIRONMENT = process.env.ENVIRONMENT;

router.post("/", async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        error: true,
        message: "firstname, lastname, email and password is required!",
      });
    }

    // if (!emailValidator.validate(email)){
    //   return res.status(400).json({error: true, message: 'provide a valid email'});
    // }

    const existingUser = await db("users").where({ email });

    // if(existingUser.length > 0) {
    //   return res
    //     .status(400)
    //     .json({ error: true, message: 'Email address is already registered' });
    // }

    if (email && password && first_name && last_name) {
      const hash = await bcjs.hash(password, 10);

      // reaching here means we have valid data
      const validatedEntries = { ...req.body, password: hash };

      const newUser = await db("users").insert(validatedEntries);
      return res.status(201).json(newUser);
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Unable to create a new user" });
    }
  } catch (err) {
    if (ENVIRONMENT === "development") {
      console.log(err);
      return res.json(err);
    } else {
      console.log("Something went wrong!");
      console.log(err);
      return res.status(500).json({
        error: true,
        message: "Error adding a new user to the database",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "email and password is required!",
      });
    }

    const user = await db("users").where({ email });

    const userAndPasswordValid =
      user.length > 0 ? await bcjs.compare(password, user[0].password) : false;

    if (userAndPasswordValid) {
      const token = await generateToken(user[0]);
      return res.status(200).json({
        email: user[0].email,
        message: `Welcome ${user[0].email}! Here's a token: `,
        token: token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    if (ENVIRONMENT === "development") {
      console.log(err);
      return res.json(err);
    } else {
      console.log("Something went wrong!");
      console.log(err);
      return res.status(500).json({
        error: true,
        message: "Error logging in",
      });
    }
  }
});

module.exports = router;
