// Import necessary modules and dependencies
import cartModel from "@/models/cart/cart.model"; // Import cart model
import { verifyJWT } from "@/utils/jwt/verifyJWT"; // Import JWT verification utility
import axios from "axios"; // Import Axios for HTTP requests

// Define the default asynchronous handler function
export default async function handler(req, res) {
    // Extract the HTTP method from the request
    const { method } = req;

    // Check if the HTTP method is not POST, return an error response
    if (method !== "POST") {
        return res.status(401).send({
            message: "Method invalid"
        });
    }

    // Extract productIds and authToken from request body and headers respectively
    const { productId, quantity } = req.body;
    const authToken = req.headers["user-auth-token"];

    console.log({ productId, quantity, authToken });

    try {
        // Check if the productIds array is empty, throw an error if so
        if (productId.length === 0)
            throw {
                status: 404,
                msg: "Empty products cannot be added to cart"
            };

        if (quantity === 0 || quantity <= 0)
            throw {
                status: 404,
                msg: "Quantity should be at least 1 and non negative number"
            };

        // Validate the provided authToken
        const checkAuthToken = validateAuthToken(authToken);
        console.log("checkAuthToken: ", checkAuthToken);
        if (!checkAuthToken) throw { status: 400, msg: "Invalid user" };

        // Verify if the user associated with the token is registered
        const checkIsUservalid = await axios.post("http://localhost:3000/api/user/authentication/check/email", { email: checkAuthToken.email });
        if (!checkIsUservalid.data.isUserRegistered) {
            throw { status: 400, msg: "No user account found!" };
        }

        // Extract userId from the validated authToken
        const userId = checkAuthToken.id;

        const checkProductAlreadyExists = await cartModel.findOne({ userId, productId });
        let createNewProductInCart;

        if (!checkProductAlreadyExists) {
            createNewProductInCart = await cartModel.create({ userId, productId, quantity });
        } else {
            const { _id } = checkProductAlreadyExists._doc;
            let updateQuantity = await cartModel.updateOne({ _id }, { $set: { quantity } });
            createNewProductInCart = updateQuantity;
        }

        // Send a success response with the added products to cart
        return res.send({ userId, productId, quantity, checkProductAlreadyExists, createNewProductInCart });
    } catch (error) {
        // Handle errors and send appropriate status code and error message
        const status = error.status || 500;
        return res.status(status).send({
            msg: error.msg
        });
    }
}

// Utility function to validate the JWT token
const validateAuthToken = (token) => {
    const tokenVerify = verifyJWT(token, process.env.NEXT_PUBLIC_USER_JWT_SECRET_KEY);
    console.log("token::", tokenVerify);
    return tokenVerify;
};

const checkProductsInDatabase = async (userId, productsIds) => {
    try {
        const checkInDB = await cartModel.find({ userId, pro });
    } catch (error) {
        return null;
    }
};
