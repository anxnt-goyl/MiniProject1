const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true,
    trim: true
  },

  specialization: {
    type: String,
    required: true,
    enum: [
      'Gynecologist',
      'Surgeon',
      'Cardiologist',
      'General Physician',
      'Other'
    ]
  },

  degree: {
    type: String,
    required: true,
    trim: true
  },

  hospitalName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  }

}, { timestamps: true });

//define the model
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;