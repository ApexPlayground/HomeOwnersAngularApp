require('dotenv').config(); // load environment variables from .env file

const mongoose = require('mongoose');

// define an asynchronous function to connect to the database
const db = async () => {
    try {
        // connect to MongoDB using the provided URL
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected'); // log a message if connection is successful
    } catch (error) {
        console.log(error); // log any errors that occur during connection
    }
};

// call the dbConnect function to connect to the database
db();

// export the dbConnect function for use in other files
module.exports = db;
