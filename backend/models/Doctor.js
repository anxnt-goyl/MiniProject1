const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({

  hospitalName: {
    type: String,
    required: true,
    trim: true
  },

  address: {
    type: String,
    required: true,
    trim: true 
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@h\.com$/, "Only @h.com emails allowed"]
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   minlength: 4
  // },

  password: {
    type: String,
    required: true,
    minlength: 6
  }

}, { timestamps: true });

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;