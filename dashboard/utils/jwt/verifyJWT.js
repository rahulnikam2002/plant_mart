import { verify } from "jsonwebtoken";

export const verifyJWT = (token, secret) => {
    const verifyToken = verify(token, secret);
    if (!verifyToken) return false;
    return verifyToken;
};
