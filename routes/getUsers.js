const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const moddleware = require("./../middlewares/CheckUser");
const UserSchema = require("./../models/UsersSchema");
const QueueSchema = require("./../models/queueSchema");

const LaboratoryQueue = require("./../models/LaboratoryQueue");
router
  .route("/")
  .all(moddleware)
  .post(async (req, res) => {
    QueueSchema.findOne({}).then((ress) => {
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

router
  .route("/delete")
  .all(moddleware)
  .post(async (req, res) => {
    QueueSchema.findOne({}).then((r) => {
      const index = r.users.indexOf({
        _id: req.body.mongoId,
        user_id: req.body.userId,
      });
      r.users.splice(index, 1);
      r.save();
      if (index > -1) {
        res.json({ success: false, msg: "წაშლა ვერ გამხორციელდა" });
      } else {
        UserSchema.findOne({ id_number: req.body.userId }).then((resultt) => {
          resultt.history.pop();
          resultt
            .save()
            .then(() =>
              res.json({ success: true, msg: "წაშლა განხორციელდა წარმატებით" })
            );
        });
      }
    });
  });

// transfer user in Laboratory Queue

router
  .route("/transfer")
  .all(moddleware)
  .post(async (req, res) => {
    QueueSchema.findOne({}).then((result) => {
      let index;
      result.users.map((item, i) => {
        if (item.user_id == req.body.userId) {
          index = i;
        }
      });
      console.log(result.users[index].history_id);
      const deletedId = result.users[index].history_id;
      result.users.splice(index, 1);
      result.save();
      if (index < -1) {
        res.json({
          success: false,
          msg: "დაფიქსირდა შეცდომა მომხმარებელი არ მოიძებნა",
        });
      } else {
        LaboratoryQueue.findOne({}).then((r) => {
          if (r) {
            r.users.push({
              history_id: deletedId,
              user_id: req.body.userId,
            });
            r.save().then(() => {
              res.json({
                success: true,
                msg: "მონაცემი წარმატებით გაიგზავნა ლაბორატორიაში",
              });
            });
          } else {
            const Laboratory = new LaboratoryQueue({
              users: [
                {
                  history_id: deletedId,
                  user_id: req.body.userId,
                },
              ],
            });
            Laboratory.save().then(() => {
              res.json({
                success: true,
                msg: "მონაცემი წარმატებით გაიგზავნა ლაბორატორიაში",
              });
            });
          }
        });
      }
    });
  });

router
  .route("/laboratory")
  .all(moddleware)
  .post(async (req, res) => {
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
