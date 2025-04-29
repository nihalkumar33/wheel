import express from "express";
import cors from "cors";
import 'dotenv/config'
import wheelRoutes from "./routes/wheel.route.js"
import connectDB from "./db/db.config.js"

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/wheel", wheelRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}) 

