const express = require('express');
const router = express.Router();
const { showRegistrationPage , showLoginPage} = require('../controllers/doctorController');

//page routes
router.get('/register', showRegistrationPage);
router.get('/login', showLoginPage);

//action routes
// router.post('/patient/register', register);
// router.post('/patient/login', login);
 
module.exports = router;