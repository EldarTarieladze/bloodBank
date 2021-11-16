const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const loginSchema = require("./../models/administratorSchema");

router.get("/get", (req, res) => {
  const password = bcrypt.hashSync("laborator", 7);
  res.json("hello");
  const login = new loginSchema({
    username: "laborator",
    password: password,
    role: "laborator",
  });
  login.save();
});

module.exports = router;
