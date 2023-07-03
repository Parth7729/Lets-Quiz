import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_PWD = process.env.DB_PWD || "";


const server = express();

// middlewares
server.use(cors());
server.use(express.json());
server.use("/api", router); // router middleware should be placed at the last


const URI = "mongodb+srv://guptaparth716:"+DB_PWD+"@cluster0.k8nm3i3.mongodb.net/";
mongoose.connect(URI, {dbName: "main"}).then(() => console.log("db connected sucessfully!")).catch((e) => console.log(e));


server.listen(PORT, () => console.log("server started successfully on port:", PORT));