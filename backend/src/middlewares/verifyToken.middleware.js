import jwt from 'jsonwebtoken';

import { User } from "../models/user.model.js";

export const veriftToken = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ success: false, message: "Unauthorized- no token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        if(!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized- invalid token" });
        }

        const user = await User.findById(decoded.userId);
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.userId = decoded.userId;
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};