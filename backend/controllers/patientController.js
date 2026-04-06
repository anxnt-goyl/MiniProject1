const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const path = require('path');  

// show registration page
function showRegistrationPage(req, res) {
    res.sendFile(path.join(__dirname, '..','..' ,'frontend', 'home_dashboard', 'auth' , 'patient-register.html'));
}

module.exports = {
    showRegistrationPage
    // register,
    // login
};