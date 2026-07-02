import express from 'express';
import { getUser, updateUser } from '../../controllers/users/user.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.middleware.js';
import { validateEditUser } from '../../middlewares/validation/validationUser.middleware.js';
import { upload } from '../../config/multer.config.js';

const router = express.Router();

router.get('/', verifyToken, getUser);

router.patch('/edit', verifyToken, upload.single('profileImage'), validateEditUser, updateUser);

export default router;