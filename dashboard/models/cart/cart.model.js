import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        },
        quantity: {
            type: Number,
            default: 1
        }
    },
    { timeseries: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
