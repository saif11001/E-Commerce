import express from 'express';
import { deleteAllUsers, deleteUser, getAllUsers, getUser } from '../../controllers/admin/users.controller.js';
import { veriftToken } from '../../middlewares/verifyToken.middleware.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin.middleware.js';

const router = express.Router();

router.get('/users', veriftToken, verifyAdmin, getAllUsers);

router.get('/user/:userId', veriftToken, verifyAdmin, getUser);

router.delete('/user/:userId', veriftToken, verifyAdmin, deleteUser);

router.delete('/users', veriftToken, verifyAdmin, deleteAllUsers);

export default router;