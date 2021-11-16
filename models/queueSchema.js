const mongoose = require("mongoose");

const Users = mongoose.Schema({
  user_id: Number,
  history_id: Number,
});
const Queue = mongoose.Schema({
  users: [Users],
});

module.exports = mongoose.model("queue", Queue);
