const express = require("express");
const router = express.Router();
const User = require("./../../models/UsersSchema");
const bcrypt = require("bcrypt");

const QueueSchema = require("./../../models/queueSchema");
const middleware = require("./../../middlewares/CheckUser");
const UsersSchema = require("./../../models/UsersSchema");

router
  .route("/")
  .all(middleware)
  .post(async (req, res) => {
    console.log(req.body.analyze[0].category);
    User.findOne({ id_number: req.body.idnumber }).then((result) => {
      const history = [
        {
          doctor_name: "null",
          doctor_surname: "null",
          date: req.body.date,
          analyze: req.body.analyze,
          answer: "null",
        },
      ];
      if (!result) {
        const newUser = new User({
          name: req.body.name,
          surname: req.body.surname,
          id_number: req.body.idnumber,
          gender: req.body.gender,
          date: req.body.date,
          history: history,
        });
        newUser.save().then((r) => {
          console.log(r);
          QueueSchema.findOne({}).then((resul) => {
            if (resul) {
              resul.users.push({
                user_id: req.body.idnumber,
                history_id: r.history.length - 1,
              });
              resul.save();
              res.json({
                msg: "რეგისტრაცია განხორციელდა წარმატებით",
                success: true,
                atFirst: true,
              });
            } else {
              const user = new QueueSchema({
                users: [
                  {
                    user_id: req.body.idnumber,
                    history_id: r.history.length - 1,
                  },
                ],
              });
              user.save();
              res.json({
                msg: "რეგისტრაცია განხორციელდა წარმატებით",
                success: true,
                atFirst: true,
              });
            }
          });
        });
      } else {
        const history = {
          doctor_name: "null",
          doctor_surname: "null",
          date: req.body.date,
          answer: "null",
          analyze: req.body.analyze,
        };

        result.history.push(history);
        result.save().then((r) => {
          QueueSchema.findOne({}).then((resul) => {
            if (resul) {
              resul.users.push({
                user_id: req.body.idnumber,
                history_id: r.history.length - 1,
              });
              resul.save();
              res.json({
                msg: "რეგისტრაცია განხორციელდა წარმატებით",
                success: true,
                atFirst: false,
              });
            } else {
              const user = new QueueSchema({
                users: [
                  {
                    user_id: req.body.idnumber,
                    history_id: r.history.length - 1,
                  },
                ],
              });

              user.save();
              res.json({
                msg: "რეგისტრაცია განხორციელდა წარმატებით",
                success: true,
                atFirst: false,
              });
            }
          });
        });
      }
    });
  });

// router.get("/test", async (req, res) => {
//   const history = [
//     {
//       doctor_name: "String",
//       doctor_surname: "String",
//       analyze_name: "String",
//       analyze_code: "String",
//       date: "String",
//       answer: "String",
//       diagnose: "String",
//     },
//   ];
//   const newUser = new User({
//     name: "jano",
//     surname: "gazashvili",
//     id_number: 1,
//     gender: true,
//     data: "1999/01/09",
//     history: history,
//   });
//   newUser.save();
//   res.json("true");
// });
module.exports = router;
