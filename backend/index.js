// required dependencies
const express = require('express');
const connectToDatabase = require('./connection');
const homeRoutes = require('./routes/homeRoutes');
const patientRoutes = require('./routes/patientRoutes');
const path = require('path');

//port and app setup
const app = express();
const port = 8000;

//routes
app.use('/', homeRoutes);

app.use('/patient', patientRoutes);

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'home_dashboard'))); // serve frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend', 'home_dashboard','auth'))); // serve auth files
//db connection
connectToDatabase('mongodb://localhost:27017/mydatabase').then(() => console.log('Connected to MongoDB')).catch(err => console.error('Failed to connect to MongoDB', err));





app.listen(port);