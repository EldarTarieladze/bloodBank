const mongoose = require("mongoose");

let TicketSchema = mongoose.Schema({
  id: String,
  status: Number,
  isReserved: Boolean,
  name_id: String,
});

module.exports = mongoose.model("tickets", TicketSchema);
