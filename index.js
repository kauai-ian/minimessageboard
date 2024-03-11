// backend
import express from "express";
import morgan from "morgan";
import {connectDb} from "./db.js"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

connectDb();

// route handlers



// server start
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
