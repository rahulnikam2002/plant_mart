import userModel from "@/models/auth/user.model";
import { verifyJWT } from "@/utils/jwt/verifyJWT";
import axios from "axios";

export default async function handler(req, res) {
    const { method } = req;

    if (method !== "GET") {
        return res.status(401).send({
            message: "Method invalid"
        });
    }

    const { streetAddress, landMark, mainLocation, pinCode } = req.body;
    const authToken = req.cookies.token;

    try {
        if (!authToken) throw { status: 400, msg: "Auth token missing" };

        const user = await userModel.find({}).select("name email");
        console.log({ user });

        if (!user) {
            throw { status: 404, msg: "User not found" };
        }

        // Respond with the updated user object
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        // Handle errors and send appropriate status code and error message
        const status = error.status || 500;
        return res.status(status).send({
            msg: error.msg
        });
    }
}
