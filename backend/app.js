import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/config/db.js";
import authRouter from "./src/routers/auth.route.js";

import adminRouter from "./src/routers/admin/users.route.js";
import categoryAdminRouter from "./src/routers/admin/category.route.js";
import productAdminRouter from "./src/routers/admin/product.route.js";

import userRouter from "./src/routers/users/user.route.js";
import productRouter from "./src/routers/users/product.route.js";
import cartRouter from "./src/routers/users/cart.route.js";


dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/auth/', authRouter);

app.use('/api/v1/admin/', adminRouter);
app.use('/api/v1/admin/categories', categoryAdminRouter);
app.use('/api/v1/admin/products', productAdminRouter);

app.use('/api/v1/user/', userRouter);
app.use('/api/v1/products/', productRouter);
app.use('/api/v1/cart/', cartRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch((error) => {
    console.log("Failed to connect:", error);
    process.exit(1);
});