const mongoose = require("mongoose");

const Users = mongoose.Schema({
  user_id: Number,
  history_id: Number,
});
const LaboratoryQueue = mongoose.Schema({
  users: [Users],
});

module.exports = mongoose.model("laboratory_queue", LaboratoryQueue);
