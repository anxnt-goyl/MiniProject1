const express = require('express');
const router = express.Router();
const { showRegistrationPage } = require('../controllers/patientController');

//page routes
router.get('/register', showRegistrationPage);
router.post('/register', showRegistrationPage); // Placeholder for actual registration logic

//action routes
// router.post('/patient/register', register);
// router.post('/patient/login', login);
 
module.exports = router;