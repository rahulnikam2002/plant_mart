// Import necessary modules and dependencies
import cartModel from "@/models/cart/cart.model"; // Import cart model
import { verifyJWT } from "@/utils/jwt/verifyJWT"; // Import JWT verification utility
import axios from "axios"; // Import Axios for HTTP requests

// Define the default asynchronous handler function
export default async function handler(req, res) {
    // Extract the HTTP method from the request
    const { method } = req;

    // Check if the HTTP method is not POST, return an error response
    if (method !== "GET") {
        return res.status(401).send({
            message: "Method invalid"
        });
    }

    // Extract productIds and authToken from request body and headers respectively
    const authToken = req.headers["user-auth-token"];

    try {
        // Validate the provided authToken
        const checkAuthToken = validateAuthToken(authToken);
        console.log({ checkAuthToken });

        if (!checkAuthToken) throw { status: 400, msg: "Invalid user", tokenExired: true };

        // Verify if the user associated with the token is registered
        const checkIsUservalid = await axios.post("http://localhost:3000/api/user/authentication/check/email", { email: checkAuthToken.email });
        if (!checkIsUservalid.data.isUserRegistered) {
            throw { status: 400, msg: "No user account found!" };
        }

        // Extract userId from the validated authToken
        const userId = checkAuthToken.id;

        const fetchProductsFromCart = await cartModel.find({ userId }).populate("productId").populate("userId");

        // Send a success response with the added products to cart
        return res.send(fetchProductsFromCart);
    } catch (error) {
        // Handle errors and send appropriate status code and error message
        console.log(error);
        console.log("This is the error");
        const status = error.status || 500;
        return res.status(status).send({
            msg: error.msg,
            tokenExired: error.tokenExired
        });
    }
}

// Utility function to validate the JWT token
const validateAuthToken = (token) => {
    console.log({ token });
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
