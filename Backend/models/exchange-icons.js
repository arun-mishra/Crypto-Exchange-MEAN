const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exchangeIconsSchema = new Schema({
  exchange_id: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("exchange-icons", exchangeIconsSchema);
