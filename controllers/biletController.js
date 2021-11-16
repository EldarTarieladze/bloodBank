const TicketSchema = require("../models/biletSchema");

const getBillets = async (req, res) => {
  TicketSchema.find({}).then((r) => {
    res.json({ data: r });
  });
};

module.exports = { getBillets };
