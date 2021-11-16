const mongoose = require("mongoose");

let Staff = mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("staff", Staff);
