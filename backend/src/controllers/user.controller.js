import bcrypt from 'bcryptjs';

import { User } from "../models/user.model.js"
import { sendVerificationEmail } from "../nodemailer/emails.js";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateUser = async (req, res, next) => {
    const { name, email, password } = req.body || {} ;
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if(name !== undefined) {
            if(name === user.name){
                return res.status(400).json({ success: false, message: "New name must be different from the current name" });
            }
            user.name = name;
        }
        if(email !== undefined) {
            const emailExists = await User.findOne({ email });
            if(emailExists) {
                return res.status(404).json({ success: false, message: "Email already in use" });
            }
            user.email = email;
            user.isVerified = false;
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
            user.verificationToken = verificationToken;
            user.verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;
            await sendVerificationEmail({
                email,
                name: user.name,
                token: verificationToken
            });
        }
        if(password) {
            const isEqual = await bcrypt.compare(password, user.password);
            if(isEqual) {
                return res.status(404).json({ success: false, message: "You cannot reuse your old password" });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
        }
        
        await user.save();
        res.status(201).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
