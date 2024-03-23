const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: [
        {
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
        }
    ],
    phone: {
        type: String
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            }
        }
    ],
    wishlists: [
        {
            name: {
                type: String
            },
            products: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                }
            ]
        }
    ]
});

export default mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
