const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const dbConnect = require('./configs/dbConnect');
const authRoutes = require('./routes/authRoutes');
const advertRoutes = require('./routes/advertRoutes')
app.use(express.json()); //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
const PORT = process.env.PORT || 4000; //port number
dbConnect(); //connects to the database

app.use('/api',authRoutes); //routes to the authRoutes
app.use('/api',advertRoutes); //routes to the advertRoutes

app.use('/',(req,res) => { //root route
    res.send(`<h1 style='color:white; background-color:black; margin:0;padding:.5cm;border-radius:2rem;text-align:center '>Hello there!👋 this is the index api for the app. running at this port 👉 ${PORT} </h1>`);
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`)); //listens to the port number and logs it to the console 
app.use(notFound)
app.use(errorHandler)   