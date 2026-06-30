import express from 'express';
import { deleteAllUsers, deleteUser, getAllUsers, getUser } from '../../controllers/admin/users.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.middleware.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin.middleware.js';

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getAllUsers);

router.get('/user/:userId', verifyToken, verifyAdmin, getUser);

router.delete('/user/:userId', verifyToken, verifyAdmin, deleteUser);

router.delete('/users', verifyToken, verifyAdmin, deleteAllUsers);

export default router;