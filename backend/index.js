const express = require('express');
const path = require('path');

// routes
const homeRoutes = require('./routes/homeRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const pss = require('./middleware/pss');
// database
const connectToDatabase = require('./connection');

const app = express();
const PORT = 8000;


// 🔹 1. View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend'));


// 🔹 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, '..', 'frontend')));


// 🔹 3. Routes
app.use("/", pss);
app.use('/', homeRoutes);
app.use('/patient', patientRoutes);
app.use('/hospital', doctorRoutes);


// 🔹 4. Database Connection + Server Start
connectToDatabase('mongodb://localhost:27017/projectDB')
    .then(() => {
        console.log('✅ Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`🚀 Server running at: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
    });