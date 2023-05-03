import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define an asynchronous function to connect to the database
const dbConnect = async () => {
    try {
        // Connect to MongoDB using the provided URL
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected'); // Log a message if connection is successful
    } catch (error) {
        console.log(error); // Log any errors that occur during connection
    }
};

// Call the dbConnect function to connect to the database
dbConnect();

// Export the dbConnect function for use in other files
export default dbConnect;
