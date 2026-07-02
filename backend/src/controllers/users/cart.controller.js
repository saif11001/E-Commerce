import { Cart } from '../../models/cart.model.js';
import { Product } from '../../models/product.model.js';

export const addToCart = async (req, res, next) => {
    const { productId, quantity, size } = req.body;
    try {
        const product = await Product.findOne({ _id: productId, isActive: true });
        if(!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        if(!product.sizes.includes(size)) {
            return res.status(400).json({ success: false, message: "Size not available for this product" });
        }

        const qty = quantity || 1;
        if(product.stock < qty) {
            return res.status(400).json({ success: false, message: "Not enough stock available" });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if(!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [{ product: productId, quantity: qty, size }]
            })
        } else {
            const existingItem = cart.items.find(
                item => item.product.toString() === productId && item.size === size
            );

            if(existingItem) {
                if(product.stock < existingItem.quantity + qty) {
                    return res.status(400).json({ success: false, message: "Not enough stock available" });
                }
                existingItem.quantity += qty
            } else {
                cart.items.push({ product: productId, quantity: qty, size });
            }
        }

        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price discountPrice images stock');

        res.status(200).json({ success: true, message: "Product added to cart", cart: populatedCart })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price discountPrice images stock isActive');
        if(!cart) {
            return res.status(400).json({ success: false, message: "Cart not found." });
        }
        if(cart.items.length === 0) {
            return res.status(200).json({ success: true, cart: { items: [] }, totalPrice: 0 });
        }
        let totalPrice = 0
        cart.items.forEach(item => {
            const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
            totalPrice += price * item.quantity;
        });

        res.status(200).json({ success: true, cart, totalPrice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateCart = async (req, res, next) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    try {
        if(!quantity || quantity < 1) {
            return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if(!cart) {
            return res.status(400).json({ success: false, message: "Cart not found." });
        }

        const item = cart.items.id(itemId);
        if(!item) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        const product = await Product.findById(item.product);
        if(!product) {
            return res.status(400).json({ success: false, message: "Product not found" })
        }

        if(product.stock < quantity) {
            return res.status(400).json({ success: false, message: "Not enough stock available" });
        }

        item.quantity = quantity;
        await cart.save();

        const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price discountPrice images stock');
        res.status(201).json({ success: true, message: "Cart updated successfully.", cart: populatedCart });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const removeItem = async (req, res, next) => {
    const { itemId } = req.params; 
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if(!cart) {
            return res.status(400).json({ success: false, message: "Cart not found." });
        }

        const item = cart.items.id(itemId);
        if(!item) {
            return res.status(400).json({ success: false, message: "Item not found in cart." });
        }

        item.deleteOne();
        await cart.save();

        res.status(200).json({ success: true, message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if(!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();
        res.status(200).json({ success: true, message: "Cart cleared", cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}