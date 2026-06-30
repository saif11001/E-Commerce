import { Category } from "../../models/category.model.js";
import { Product } from "../../models/product.model.js";

const generateSlug = (name) => {
    return name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, 'and')
        .replace(/[^\w-]/g, '');
};

export const createCategory = async (req, res, next) => {
    const { name, description } = req.body;
    try {
        const categoryExists = await Category.findOne({ name });
        if(categoryExists) {
            return res.status(400).json({ success: false, message: "Category already exists." });
        }

        const slug = generateSlug(name);

        const category = new Category({
            name,
            description,
            slug
        })
        await category.save();

        res.status(201).json({ success: true, message: "Create category successfully", category: category });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(400).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, category: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });        
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        if(!categories) {
            return res.status(400).json({ success: false, message: "Categories not found" });
        }
        res.status(200).json({ success: true, categories: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const { name, description, isActive } = req.body || {};
    try {
        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(400).json({ success: false, message: "Category not found." });
        }

        if(name) {
            if(category.name === name) {
                return res.status(400).json({ success: false, message: "Please create a new name for the category, different from the current name." });
            }
            category.name = name;
            category.slug = generateSlug(name);
        }
        if(description !== undefined) {
            category.description = description
        }
        if(isActive !== undefined) {
            category.isActive = isActive;
        }
        await category.save();

        res.status(201).json({ success: true, message: "Update Category successfully.", category: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(404).json({ success: false, message: "Category not found"})
        }
        const hasProducts = await Product.findOne({ category: categoryId });
        if(hasProducts) {
            return res.status(400).json({ success: false, message: "Cannot delete category with existing products." });
        }

        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}