const doctor = require('../models/doctor');

// show registration page
function showRegistrationPage(req, res) {
    res.render('home_dashboard/auth/doctor-register');
}
//show login page
function showLoginPage(req, res) {
    res.render('home_dashboard/auth/doctor-login');
}

module.exports = {
    showRegistrationPage,
    showLoginPage
};