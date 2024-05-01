import { verify } from "jsonwebtoken";

export const verifyJWT = (token, secret) => {
    try {
        const verifyToken = verify(token, secret);
        return verifyToken;
    } catch (error) {
        console.error("Error verifying JWT:", error);
        return false;
    }
};
