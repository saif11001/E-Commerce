import express from 'express';
import { forgetPassword, login, logout, resetPassword, signup, verifyEmail } from '../controllers/auth.controller.js';
import { validateForgetPassword, validateLogin, validateResetPassword, validateSignup, validateVerifyEmail } from '../middlewares/validation.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);

router.post('/verify-email', validateVerifyEmail, verifyEmail);

router.post('/login', validateLogin, login);

router.post('/logout', logout);

router.post('/forget-password', validateForgetPassword, forgetPassword);

router.post('/reset-password/:token', validateResetPassword, resetPassword);

export default router;