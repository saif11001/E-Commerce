import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../../controllers/admin/category.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.middleware.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin.middleware.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, createCategory);

router.get('/', verifyToken, verifyAdmin, getCategories);

router.get('/:categoryId', verifyToken, verifyAdmin, getCategory);

router.patch('/:categoryId', verifyToken, verifyAdmin, updateCategory);

router.delete('/:categoryId', verifyToken, verifyAdmin, deleteCategory);

export default router;