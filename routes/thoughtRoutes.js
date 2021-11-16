const express = require("express");
const router = express.Router();
const LaboratoryQueue = require("../models/LaboratoryQueue");
const middleware = require("./../middlewares/CheckUser");

router
  .route("/laboratory")
  .all(middleware)
  .get(async (req, res) => {
    LaboratoryQueue.findOne({}).then((ress) => {
      if (ress) {
        UserSchema.find({
          id_number: { $in: ress.users.map((item) => item.user_id) },
        }).then((r) => {
          res.json({ success: true, users: r, queue: ress.users });
        });
      } else {
        res.json({ success: false });
      }
    });
  });

module.exports = router;
