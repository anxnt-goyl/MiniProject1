const Patient = require('../models/Patient');  

// show registration page
function showRegistrationPage(req, res) {
    res.render('home_dashboard/auth/patient-register');
} 
//show login page
function showLoginPage(req, res) {
    res.render('home_dashboard/auth/patient-login');
}
//patient dashboard page
function showDashboard(req, res) {
    res.render('patientDashboard/patient');
}
//register action
async function register(req, res) {
    const { fullName, age, gender, phone, email, password } = req.body;
    if(!fullName || !age || !gender || !phone || !email || !password) {
        return res.status(400).send('All fields are required');
    }
    try{
        const existingPatient = await Patient.findOne({ email });
        if(existingPatient) {
            return res.status(400).send('Email already registered');
        }
        await Patient.create({ fullName, age, gender, phone, email, password });
        res.redirect('/patient/login');
    }catch (err) {
        res.status(500).send(err.message);
    }
}
//login action
async function login(req, res) {
    const { email, password } = req.body;   
    if(!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    try {
        const patient = await Patient.findOne({ email, password });
        if(!patient) {
            return res.status(400).send('Invalid email or password');
        }
        // res.redirect('/patient/dashboard');
        //data transfer from db to patient ejs file for patient card
        res.render('PatientDashboard/Patient', {patient});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    showRegistrationPage,
    showLoginPage,
    login,
    register,
    showDashboard
};