const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  exchange_id: { type: String },
  website: { type: String },
  name: { type: String },
  data_start: { type: String },
  data_end: { type: String },
  data_quote_start: { type: Date },
  data_quote_end: { type: Date },
  data_symbols_count: { type: Number },
  volume_1hrs_usd: { type: Number },
  volume_1day_usd: { type: Number },
  volume_1mth_usd: { type: Number },
});

module.exports = mongoose.model("exchanges", exchangeSchema);
