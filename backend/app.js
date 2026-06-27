import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/config/db.js";
import authRouter from "./src/routers/auth.route.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth/', authRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch((error) => {
    console.log("Failed to connect:", error);
    process.exit(1);
});