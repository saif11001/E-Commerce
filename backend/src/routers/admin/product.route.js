import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../../controllers/admin/product.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.middleware.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin.middleware.js';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, getProducts);

router.get('/:productId', verifyToken, verifyAdmin, getProduct);

router.post('/', verifyToken, verifyAdmin, createProduct);

router.patch('/:productId', verifyToken, verifyAdmin, updateProduct);

router.delete('/:productId', verifyToken, verifyAdmin, deleteProduct);

export default router;