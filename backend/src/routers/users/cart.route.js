import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.middleware.js';
import { addToCart, clearCart, getCart, removeItem, updateCart } from '../../controllers/users/cart.controller.js';

const router = express.Router();

router.post('/', verifyToken, addToCart);

router.get('/', verifyToken, getCart);

router.patch('/:itemId', verifyToken, updateCart);

router.delete('/:itemId', verifyToken, removeItem);

router.delete('/', verifyToken, clearCart);

export default router;