// Import necessary modules and dependencies

import { Orders } from "@/models/orders/orders.models";
import { verifyJWT } from "@/utils/jwt/verifyJWT"; // Import JWT verification utility
import axios from "axios"; // Import Axios for HTTP requests
import mongoose from "mongoose";

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
    const authToken = req.cookies.token;

    console.log({ authToken });

    try {
        if (!authToken) {
            throw {
                status: 404,
                msg: "Admin Auth token is missing"
            };
        }
        const getAllOrdersFromDB = await Orders.find({})
            .populate("userId")
            .populate("products.product")
            .catch((err) => console.log({ err: err }));

        return res.status(201).send(getAllOrdersFromDB);
    } catch (error) {
        // Handle errors and send appropriate status code and error message
        console.log({ error });
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
