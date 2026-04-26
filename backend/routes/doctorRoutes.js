const express = require('express');
const router = express.Router();
const { showRegistrationPage , showLoginPage , login, register,showDashboard, showPatientRegister} = require('../controllers/doctorController');

//page routes
router.get('/register', showRegistrationPage);
router.get('/login', showLoginPage);
router.get('/dashboard', showDashboard);

//action routes
router.post('/register', register);
router.post('/login', login);
router.get('/patient/register', showPatientRegister);
 
module.exports = router;