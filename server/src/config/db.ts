
// import dns from "dns";
import { connect } from "mongoose";
import AppError from "../utils/appError.js";
import { log } from "console";

// Configure DNS before connecting to MongoDB



const connectDB = async (): Promise<void> => {
    const dbUrl = process.env.DB_URL?.trim();

    // log(dbUrl);
    if (!dbUrl) {
        throw new AppError("DB_URL is not defined");
    }


    try {
        await connect(dbUrl);
        console.log("MongoDB connected");
    } catch (error) {
        throw new AppError("Failed to connect to MongoDB", 500, error);
    }
};

export default connectDB;
