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
  },

  hospital: {
  type: String,
  required: true
  },

  createdAt: {
  type: Date,
  default: Date.now
  },

  pss: {
    type: Number,
    default: 0
  },

  waitingTime: {
  type: Number,
  default: 0
  },
  
  status: {
    type: String,
    default: "Stable"
  }

}, { timestamps: true });

//define the model
const Patient = mongoose.model("Patient", patientDataSchema);

module.exports = Patient;