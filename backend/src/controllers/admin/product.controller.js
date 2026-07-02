import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { deleteImage } from "../../utils/deleteImage.js";

export const getProducts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const totalProducts = await Product.countDocuments();
        const products = await Product.find().sort({ createdAt: -1 }).populate('category', 'name slug').skip(skip).limit(limit);
        res.status(200).json({ 
            success: true,
            products,
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
        const product = await Product.findById(productId).populate('category', 'name slug');
        if(!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        res.status(200).json({ success: true, product: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createProduct = async (req, res, next) => {
    const { name, description, price, discountPrice, category, stock, sizes, isFeatured } = req.body;
    try {
        const categoryExists = await Category.findById(category);
        if(!categoryExists) {
            if(req.files) req.files.forEach(file => deleteImage(`/uploads/products/${file.filename}`));
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        const images = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];

        if(discountPrice !== undefined && Number(discountPrice) > Number(price)) {
            return res.status(400).json({ success: false, message: "Discount price cannot be greater than the original price." });
        }

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            category,
            stock,
            sizes,
            isFeatured,
            images
        });

        await product.save();
        res.status(201).json({ success: true, message: "Created product successfully.", product: product });

    } catch (error) {
        if(req.files) req.files.forEach(file => deleteImage(`/uploads/products/${file.filename}`));
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    const { name, description, price, discountPrice, category, stock, sizes, isFeatured, isActive } = req.body || {};
    try {
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(400).json({ success: false, message: "Product not found" })
        }

        if(category) {
            const categoryExists = await Category.findById(category);
            if(!categoryExists) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }
        }
        
        if(req.files && req.files.length > 0) {
            product.images.forEach(image => deleteImage(image));
            product.images = req.files.map(file => `/uploads/products/${file.filename}`);
        }
        
        if(name !== undefined) product.name = name;
        if(description !== undefined) product.description = description;
        if(price !== undefined) product.price = price;
        if(discountPrice !== undefined) {    
            if(Number(discountPrice) > Number(price)) {
                return res.status(400).json({ success: false, message: "Discount price cannot be greater than the original price." });
            }
            product.discountPrice = discountPrice;
        }
        if(category !== undefined) product.category = category;
        if(stock !== undefined) product.stock = stock;
        if(sizes !== undefined) product.sizes = sizes;
        if(isFeatured !== undefined) product.isFeatured = isFeatured;
        if(isActive !== undefined) product.isActive = isActive;

        await product.save();
        res.status(201).json({ success: true, message: "Product updated successfully", product: product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteProduct = async (req, res, next) => {
    const { productId } =req.params;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if(!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        product.images.forEach(image => deleteImage(image));

        res.status(200).json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

