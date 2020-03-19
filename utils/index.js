const esmImport = require('esm')(module);
import jwt from "jsonwebtoken";
require("dotenv").config();

export const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.SECRET);
};

export const makeCondition = value => {
  return Number.isNaN(Number(value))
    ? { name: value.toUpperCase() }
    : { id: value };
};