const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectUrl = process.env.DB_URI;

mongoose.Promise = global.Promise;

const connectDb = async () => {
  console.log("Connecting to the database");
  try {
    await mongoose.connect(connectUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("couldnt connect to the database");
    process.exit();
  }
};

module.exports = connectDb;
