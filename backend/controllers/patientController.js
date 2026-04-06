const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const Path = require('path');

//show registration page
function showRegistrationPage(req, res) {
  res.render('home_dashboard/auth/patient-register');
}


module.exports = {
    showRegistrationPage
    // register,
    // login
}; 