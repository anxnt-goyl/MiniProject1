const Patient = require('../models/Patient');  

// show registration page
function showRegistrationPage(req, res) {
    res.render('home_dashboard/auth/patient-register');
}
//show login page
function showLoginPage(req, res) {
    res.render('home_dashboard/auth/patient-login');
}

module.exports = {
    showRegistrationPage,
    showLoginPage
};