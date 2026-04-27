const mongoose = require("mongoose");

const densitySchema = new mongoose.Schema({
  hospital: String,
  count: Number,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Density", densitySchema);