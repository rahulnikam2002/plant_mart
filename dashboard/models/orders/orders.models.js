import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products"
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        deliveryAddress: {
            street: {
                type: String
            },
            area: {
                type: String
            },
            postalCode: {
                type: String
            },
            landMark: {
                type: String
            }
        },
        deliveryStatus: {
            type: String,
            default: "Processing"
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0
        },
        totalProducts: {
            type: Number,
            required: true,
            default: 1
        }
    },
    { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model("Orders", OrdersSchema);
