const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("./../../../env.json");

const administrator = require("./../../models/administratorSchema");
router.route("/").post(async (req, ress) => {
  const username = req.body.username;
  const password = req.body.password;
  await administrator.findOne({ username: username }).then((res) => {
    if (res == null) {
      ress.json({ msg: "მომხმარებელი ვერ მოიძებნა", success: false });
    } else if (res.password.length > 0) {
      bcrypt.compare(password, res.password, (err, verified) => {
        if (verified) {
          const username = res.username;
          const role = res.role;
          const access_token = jwt.sign({ username, role }, env.ACCESS_TOKEN, {
            expiresIn: "1h",
          });
          user = res;
          ress.json({
            role: res.role,
            msg: "შესვლა განხორციელდა წარმატებით",
            access_token: access_token,
            success: true,
          });
          return;
        } else {
          ress.json({ msg: "მომხმარებლის პაროლი არასწორია", success: false });
        }
      });
    }
  });
});
module.exports = router;
