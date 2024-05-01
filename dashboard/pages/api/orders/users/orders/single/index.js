// Import necessary modules and dependencies

import { Orders } from "@/models/orders/orders.models";
import { verifyJWT } from "@/utils/jwt/verifyJWT"; // Import JWT verification utility
import axios from "axios";

// Define the default asynchronous handler function
export default async function handler(req, res) {
    // Extract the HTTP method from the request
    const { method } = req;

    // Check if the HTTP method is not PUT, return an error response
    if (method !== "POST") {
        return res.status(405).send({
            message: "Method Not Allowed"
        });
    }

    const { orderId, productObjId } = req.body;
    // Extract orderId and authToken from request body and headers respectively
    const authToken = req.headers["user-auth-token"];

    try {
        if (!orderId) {
            throw {
                status: 401,
                msg: "orderId is required"
            };
        }

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
        const singleOrderDetails = await Orders.findOne({ userId: checkAuthToken.id, _id: orderId }).populate("products.product");

        // Check if the order exists
        if (!singleOrderDetails) {
            throw {
                status: 404,
                msg: "Order not found"
            };
        }

        const { products, ...rest } = singleOrderDetails._doc;
        const singleProduct = products.filter((item) => item._id == productObjId);

        return res.status(200).send({ ...rest, singleProduct });
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
