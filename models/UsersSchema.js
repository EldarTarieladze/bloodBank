const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  name: String,
  code: Number,
  price: Number,
});
const Analyze = new mongoose.Schema({
  parent_name: String,
  parent_code: Number,
  answer: String,
  category: [Category],
});

const History = new mongoose.Schema({
  doctor_name: String,
  doctor_surname: String,
  analyze: [Analyze],

  date: String,
});

let UserSchema = mongoose.Schema({
  name: String,
  surname: String,
  id_number: Number,
  gender: Boolean,
  date: String,
  history: [History],
});

module.exports = mongoose.model("user", UserSchema);
