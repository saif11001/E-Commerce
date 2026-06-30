import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        discountPrice: {
            type: Number,
            default: 0,
            min: 0
        },
        images: [
            {
                type: String
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        sizes: [
            {
                type: String,
                enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
            }
        ],
        isFeatured: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        sold: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model('product', productSchema);