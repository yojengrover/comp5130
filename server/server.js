const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const mongoose = require('mongoose');
const morgan = require( 'morgan' )
// DOTENV
dotenv.config()
// REST OBJECT
const app = express ()

app.use (cors());
app.use(express.json( ));
app.use (morgan ("dev"));

app.get("", (req, res) => {

    res.status(200).json({

        success: true,
        message: "Welcome to My app",
}) 
});

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
