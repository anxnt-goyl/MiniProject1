const express = require('express');
const router = express.Router();

const { 
    showLoginPage, 
    login, 
    register, 
    showDashboard,
    showPatientRegister ,
    getPatientsByHospital  
} = require('../controllers/patientController');


// ================== PAGE ROUTES ==================

// show patient registration form (with hospitals)
router.get('/register', showPatientRegister);

// show login page
router.get('/login', showLoginPage);

// dashboard (should be protected later 🔐)
router.get('/dashboard', showDashboard);


// ================== ACTION ROUTES ==================

// handle patient registration
router.post('/register', register);

// handle login
router.post('/login', login);
// get patients by hospital
router.get("/by-hospital", getPatientsByHospital);


module.exports = router;