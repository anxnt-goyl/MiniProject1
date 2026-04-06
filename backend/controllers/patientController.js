const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const path = require('path');  // ⚠️ lowercase 'path' — keep it consistent

// show registration page
function showRegistrationPage(req, res) {
    res.sendFile(Path.join(__dirname, '..','..' ,'frontend', 'home_dashboard', 'auth' , 'patient-register.html'));
}

module.exports = {
    showRegistrationPage
    // register,
    // login
};