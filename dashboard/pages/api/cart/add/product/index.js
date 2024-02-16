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
    const { productIds } = req.body;
    const authToken = req.headers["user-auth-token"];

    try {
        // Check if the productIds array is empty, throw an error if so
        if (productIds.length === 0)
            throw {
                status: 404,
                msg: "Empty products cannot be added to cart"
            };

        // Validate the provided authToken
        const checkAuthToken = validateAuthToken(authToken);
        if (!checkAuthToken) throw { status: 400, msg: "Invalid user" };

        // Verify if the user associated with the token is registered
        const checkIsUservalid = await axios.post("http://localhost:3000/api/user/authentication/check/email", { email: checkAuthToken.email });
        if (!checkIsUservalid.data.isUserRegistered) {
            throw { status: 400, msg: "No user account found!" };
        }

        // Extract userId from the validated authToken
        const userId = checkAuthToken.id;

        const isProductsAlreadyInDatabase = await checkProductsInDatabase(userId, productIds);

        // Create a new cart entry with userId and productIds
        const addProductsToCart = await cartModel.create({ userId, productsInCart: productIds }).catch((err) => console.log(err));

        // Log the result of adding products to the cart
        console.log(addProductsToCart);

        // Send a success response with the added products to cart
        return res.send({ addProductsToCart });
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
    return verifyJWT(token, process.env.NEXT_PUBLIC_USER_JWT_SECRET_KEY);
};

const checkProductsInDatabase = async (userId, productsIds) => {
    try {
        // const checkInDB = await cartModel.findByIdAndUpdate()
    } catch (error) {
        return null;
    }
};
