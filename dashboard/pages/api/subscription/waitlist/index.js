// Import necessary modules and dependencies
import cartModel from "@/models/cart/cart.model"; // Import cart model
import { Orders } from "@/models/orders/orders.models";
import plusSuscriptionModel from "@/models/plusSuscription/plusSuscription.model";
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
    const { notifyUser } = req.body;
    const authToken = req.headers["user-auth-token"];

    try {
        if (!authToken) {
            throw {
                status: 404,
                msg: "Auth token is missing"
            };
        }

        // Check if the productIds array is empty, throw an error if so
        if (!notifyUser.toString())
            throw {
                status: 404,
                msg: "Notify must be boolean"
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

        const findUserInSubscription = await plusSuscriptionModel.findOne({ userId });
        console.log({ findUserInSubscription });

        if (!findUserInSubscription) {
            let createNotification = await plusSuscriptionModel.create({ userId, notify: notifyUser });
            return res.status(201).send(createNotification);
        }
        let updateUserNotification = await plusSuscriptionModel.findOneAndUpdate({ userId }, { notify: notifyUser }, { new: true });
        return res.status(201).send(updateUserNotification);
    } catch (error) {
        // Handle errors and send appropriate status code and error message
        const status = error.status || 500;
        console.log({ error });
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
