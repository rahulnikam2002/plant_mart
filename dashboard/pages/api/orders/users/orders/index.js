// Import necessary modules and dependencies

import { Orders } from "@/models/orders/orders.models";
import { verifyJWT } from "@/utils/jwt/verifyJWT"; // Import JWT verification utility
import axios from "axios";

// Define the default asynchronous handler function
export default async function handler(req, res) {
    // Extract the HTTP method from the request
    const { method } = req;

    // Check if the HTTP method is not PUT, return an error response
    if (method !== "GET") {
        return res.status(405).send({
            message: "Method Not Allowed"
        });
    }

    // Extract orderId and authToken from request body and headers respectively
    const authToken = req.headers["user-auth-token"];

    try {
        // Validate the auth token
        if (!authToken) {
            throw {
                status: 401,
                msg: "Authentication token is missing"
            };
        }

        // Validate the provided authToken
        const checkAuthToken = validateAuthToken(authToken);
        console.log("checkAuthToken: ", checkAuthToken);
        if (!checkAuthToken) throw { status: 400, msg: "Invalid user" };

        // Verify if the user associated with the token is registered
        const checkIsUservalid = await axios.post("http://localhost:3000/api/user/authentication/check/email", { email: checkAuthToken.email });
        if (!checkIsUservalid.data.isUserRegistered) {
            throw { status: 400, msg: "No user account found!" };
        }

        // Find the order and update its status to "Cancelled"
        const allUsersOrders = await Orders.find({ userId: checkAuthToken.id }).populate("products.product");

        // Check if the order exists
        if (!allUsersOrders) {
            throw {
                status: 404,
                msg: "Order not found"
            };
        }

        const allProducts = [];

        for (let i = 0; i < allUsersOrders.length; i++) {
            for (let j = 0; j < allUsersOrders[i].products.length; j++) {
                allProducts.push({ product: allUsersOrders[i].products[j], _id: allUsersOrders[i]._id });
            }
        }

        return res.status(200).send(allProducts);
    } catch (error) {
        // Handle errors and send appropriate status code and error message
        console.log({ error });
        const status = error.status || 500;
        return res.status(status).send({
            msg: error.msg || "Internal Server Error"
        });
    }
}

// Utility function to validate the JWT token
const validateAuthToken = (token) => {
    const tokenVerify = verifyJWT(token, process.env.NEXT_PUBLIC_USER_JWT_SECRET_KEY);
    console.log("token::", tokenVerify);
    return tokenVerify;
};
