// required dependencies
const express = require('express');
const connectToDatabase = require('./connection');
const homeRoutes = require('./routes/homeRoutes');
const patientRoutes = require('./routes/patientRoutes');
const path = require('path');

//port and app setup
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..","frontend"));
//port and app setup

const port = 8000;

//routes
app.use('/', homeRoutes);

app.use('/patient', patientRoutes);

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
//db connection
connectToDatabase('mongodb://localhost:27017/mydatabase').then(() => console.log('Connected to MongoDB')).catch(err => console.error('Failed to connect to MongoDB', err));

//routes
app.use('/', homeRoutes);

app.use('/patient', patientRoutes);




// app.listen(port);
app.listen(port, (err)=>{
    if(err){
        console.error('Error starting server:', err);
    }else{
        console.log(`Server is running on port http://localhost:${port}`);
    }
})
