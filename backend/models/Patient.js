const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true,
    trim: true
  },

  age: {
    type: Number,
    required: true,
    min: 0
  },

  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email']
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Enter valid phone number']
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  }

}, { timestamps: true });

//define the model
const Patient = mongoose.model("Patient", patientDataSchema);

module.exports = Patient;