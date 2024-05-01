import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        scientificName: {
            type: String
        },
        productDescription: String,
        featuredImages: [
            {
                type: String
            }
        ],
        categories: [
            {
                type: String,
                lowercase: true // Store categories in lowercase for consistency
            }
        ],
        productQuantity: {
            type: String,
            default: 0
        },
        productSKU: {
            type: String,
            unique: true // Ensure SKU is unique
        },
        productWeight: String,
        productHeight: String,
        productSpread: String,
        productMaxHeight: String,
        salePrice: {
            type: String
        },
        originalPrice: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.models.Products || mongoose.model("Products", productSchema);
