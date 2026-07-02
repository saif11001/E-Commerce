import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../../controllers/admin/product.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.middleware.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin.middleware.js';
import { upload } from '../../config/multer.config.js';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, getProducts);

router.get('/:productId', verifyToken, verifyAdmin, getProduct);

router.post('/', verifyToken, verifyAdmin, upload.array('images', 5), createProduct);

router.patch('/:productId', verifyToken, verifyAdmin, upload.array('images', 5), updateProduct);

router.delete('/:productId', verifyToken, verifyAdmin, deleteProduct);

export default router;