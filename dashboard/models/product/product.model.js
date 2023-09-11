import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
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
      type: Number,
      default: 0
    },
    productSKU: {
      type: String,
      unique: true // Ensure SKU is unique
    },
    productWeight: Number,
    productHeight: Number,
    productSpread: Number,
    productMaxHeight: Number,
    salePrice: {
      type: Number
    },
    originPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Products || mongoose.model("Products", productSchema);