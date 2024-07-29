import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/Index.js";
import connectDB from "./DB/db.js";

dotenv.config();
connectDB()
const Port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router)
app.use('/', (req, res) => { res.send("Server another is ready"); });
app.listen(Port, () => console.log(`server is running on ${Port}`));