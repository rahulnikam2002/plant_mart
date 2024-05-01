import userModel from "@/models/auth/user.model";
import { verifyJWT } from "@/utils/jwt/verifyJWT";
import axios from "axios";

export default async function handler(req, res) {
    const { method } = req;

    if (method !== "POST") {
        return res.status(401).send({
            message: "Method invalid"
        });
    }

    const { userName } = req.body;
    const authToken = req.headers["user-auth-token"];

    try {
        if (userName) {
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
            console.log({ userId });

            const user = await userModel.findByIdAndUpdate(userId, { name: userName });
            console.log({ user });

            let profileUpdated = false;

            if (user) {
                profileUpdated = true;
            }

            // Respond with the updated user object
            return res.status(201).json({ isProfileUpdated: profileUpdated });

            // Send a success response with the added products to cart
            return res.send(fetchProductsFromCart);
        } else {
            throw { status: 404, msg: "user name is missing or invalid!" };
        }
    } catch (error) {
        console.log(error);
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
