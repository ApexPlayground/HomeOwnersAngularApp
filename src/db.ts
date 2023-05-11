import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

// Define an asynchronous function to connect to the database
const connectDB = async () => {
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

// Call the connectDB function to connect to the database
connectDB();

// Export the connectDB function for use in other files
export default connectDB;
