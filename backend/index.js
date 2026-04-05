// required dependencies
const express = require('express');
const connectToDatabase = require('./connection');
const homeRoutes = require('./routes/homeRoutes');
const path = require('path');

//port and app setup
const app = express();
const port = 8000;

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'home_dashboard'))); // serve frontend files

//db connection
connectToDatabase('mongodb://localhost:27017/mydatabase').then(() => console.log('Connected to MongoDB')).catch(err => console.error('Failed to connect to MongoDB', err));

//routes
app.use('/', homeRoutes);



app.listen(port);