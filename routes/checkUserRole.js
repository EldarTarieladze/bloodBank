const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const moddleware = require("./../middlewares/CheckUser");

router
  .route("/")
  .all(moddleware)
  .post(async (req, res) => {
    res.json({ success: true, role: req.role });
  });
module.exports = router;
