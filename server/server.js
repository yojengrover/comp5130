const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const mongoose = require('mongoose');
const authRoutes = require('./routes/Signup');
const signInRoutes = require('./routes/SignIn');
const messageSaveRoute = require('./routes/MessageHandling')
const messageRoutes = require('./routes/MessageFtechandDelete');
const protectedRoutes = require('./routes/ProtectedRoutes');
const generateOTP = require('./routes/GenerateOTP.js');
const verifyOTP = require('./routes/verifyOtp');

const morgan = require( 'morgan' )
// DOTENV
dotenv.config()
// REST OBJECT
const app = express ()

app.use (cors());
app.use(express.json( ));
app.use (morgan ("dev"));

app.use('/signup', authRoutes);
app.use('/signin', signInRoutes);
app.use('/sendmessage', messageSaveRoute);
app.use('/message', messageRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/generate-otp', generateOTP);
app.use('/verify-otp', verifyOTP);
async function connect() {
    try {

       await mongoose.connect(process.env.mongoURI);
       console.log("Connected");
        
    } catch (error) {
        console.error(error);
    }
}

connect()

const PORT = process.env.PORT || 8000;

app.listen (PORT, () => {
    console.log(`Server Runnning #{PORT}`.bgGreen.white)
}) ;
