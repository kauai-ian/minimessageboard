import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectUrl = process.env.DB_URI

mongoose.Promise = global.Promise;

const connectDb = async () => {
    console.log("Connecting to the database")
    try {
        await mongoose.connect(connectUrl)
        console.log("Database connected successfully");
    } catch (error) {
        console.error("couldnt connect to the database");
        process.exit()
}
}

export { connectDb }
