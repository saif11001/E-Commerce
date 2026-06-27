import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';
import { veriftToken } from '../middlewares/verifyToken.middleware.js';
import { validateEditUser } from '../middlewares/validation/validationUser.middleware.js';

const router = express.Router();

router.get('/', veriftToken, getUser);

router.patch('/edit', veriftToken, validateEditUser, updateUser);

export default router;