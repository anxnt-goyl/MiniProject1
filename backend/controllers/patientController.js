const Patient = require('../models/Patient');
const doctor = require('../models/doctor');

// show register page with hospitals
async function showPatientRegister(req, res) {
    try {
        const hospitals = await doctor.distinct('hospitalName');
        res.render('home_dashboard/auth/patient-register', { hospitals });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// login page
function showLoginPage(req, res) {
    res.render('home_dashboard/auth/patient-login');
}

// dashboard
function showDashboard(req, res) {
    res.render('patientDashboard/patient');
}

// register
async function register(req, res) {
    const { fullName, age, gender, phone, email, password, hospital } = req.body;

    if(!fullName || !age || !gender || !phone || !email || !password || !hospital) {
        return res.status(400).send('All fields are required');
    }

    try {
        const existingPatient = await Patient.findOne({ email });

        if(existingPatient) {
            return res.status(400).send('Email already registered');
        }

        await Patient.create({ fullName, age, gender, phone, email, password, hospital });

        res.redirect('/patient/login');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// login
async function login(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const patient = await Patient.findOne({ email });

        if(!patient || patient.password !== password) {
            return res.status(400).send('Invalid email or password');
        }

        res.render('patientDashboard/patient', { patient });

    } catch (err) {
        res.status(500).send(err.message);
    }
}
async function getPatientsByHospital(req, res) {
    try {
        const hospital = req.query.hospital;
        const patients = await Patient.find({ hospital });
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    showLoginPage,
    login,
    register,
    showDashboard,
    showPatientRegister,
    getPatientsByHospital
};