import express from "express";
import cors from "cors";
import 'dotenv/config'
import wheelRoutes from "./routes/wheel.route.js"
import authRoutes from "./routes/auth.route.js"
import connectDB from "./db/db.config.js"
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/wheel", wheelRoutes);
app.use("/api/auth/wheel", authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}) 

