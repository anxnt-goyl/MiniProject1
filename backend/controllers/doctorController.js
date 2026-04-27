const doctor = require('../models/Doctor');



// show registration page
function showRegistrationPage(req, res) {
    res.render('home_dashboard/auth/doctor-register');
}
//show login page
function showLoginPage(req, res) {
    res.render('home_dashboard/auth/doctor-login');

}//
//hospital dashboard page
function showDashboard(req, res) {
  const doctorUser = req.session.doctor;

  if (!doctorUser) {
    console.log("Session missing!");
    return res.redirect('/hospital/login');
  }

  res.render('hospital_dashboard/index', {
    hospitalName: doctorUser.hospitalName
  });
}
//register action
async function register(req, res) { 
    const { hospitalName , address , email , phone , password } = req.body;
    if(!hospitalName || !address || !email || !phone || !password) {
        return res.status(400).send('All fields are required');
    }
    try{
        const existingDoctor = await doctor.findOne({ email });
        if(existingDoctor) {
            return res.status(400).send('Email already registered');
        }
        await doctor.create({ hospitalName, address, email, phone, password });
        res.redirect('/hospital/login');
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
    try{
        const doctorUser = await doctor.findOne({ email });
        if(!doctorUser) {
            return res.status(400).send('Invalid email or password');
        }
        if(doctorUser.password !== password) {
            return res.status(400).send('Invalid email or password');
        }
        req.session.doctor = doctorUser;
        res.redirect('/hospital/dashboard');
    }catch (err) {
        res.status(500).send(err.message);
    }
}



async function showPatientRegister(req, res) {
    try {
        const hospitals = await doctor.distinct('hospitalName');

        res.render('home_dashboard/auth/patient-register', { hospitals });
    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = {
    showRegistrationPage,
    showLoginPage,
    showDashboard,
    login,
    register,
    showPatientRegister,
    
};