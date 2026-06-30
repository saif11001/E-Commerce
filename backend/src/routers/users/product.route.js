import express from 'express';
import { getAllProducts, getProductsByCategory, getProduct, getFeaturedProducts } from '../../controllers/users/products.controller.js';

const router = express.Router();

router.get('/', getAllProducts);

router.get('/category/:slug', getProductsByCategory);

router.get('/featured', getFeaturedProducts);

router.get('/:productId', getProduct);

export default router;