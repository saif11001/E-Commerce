import { Product } from '../../models/product.model.js';
import { Category } from '../../models/category.model.js';

export const getAllProducts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const totalProducts = await Product.countDocuments({ isActive: true });
        const products = await Product
            .find({ isActive: true })
            .populate('category', 'name slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            products: products,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                limit
            }})

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getProductsByCategory = async (req, res, next) => {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const category = await Category.findOne({ slug, isActive:true });
        if(!category) {
            return res.status(400).json({ success: false, message: "Category not found." })
        }
        const totalProducts = await Product.countDocuments({ category: category._id, isActive: true });
        const products = await Product
            .find({ category: category._id, isActive: true })
            .populate('category', 'name slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        res.status(200).json({
            success: true,
            products: products,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                limit
            }
        })
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findOne({ _id: productId, isActive: true });
        if(!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ isFeatured: true, isActive: true }).populate('category', 'name slug').limit(8);
        if(!products) {
            return res.status(404).json({ success: false, message: "Not products found." });
        }
        res.status(200).json({ success: true, products: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}