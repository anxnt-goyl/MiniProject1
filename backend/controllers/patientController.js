const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const Path = require('path');

//show registration page
function showRegistrationPage(req, res) {
    res.sendFile(Path.join(__dirname, '..','..' ,'frontend', 'home_dashboard', 'auth' , 'patient-register.html'));
}


module.exports = {
    showRegistrationPage
    // register,
    // login
};