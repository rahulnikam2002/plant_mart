import { redis } from "@/lib/redis/connect.redis";
import userModel from "@/models/auth/user.model";
import { checkInRedisCache } from "@/utils/cache/redis";
import dbConnect from "@/utils/database/mongodb.connect";
import { verifyHMAC } from "@/utils/secure/crypto/HMAC";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    if (method !== "POST") {
        return res.send({
            msg: "Invalid request"
        });
    }
    try {
        const { email, password, key, userName, phoneNumber } = req.body;
        console.log({ email, password, key, userName });

        if (!email || !password || !key) {
            return res.send({
                msg: "Some parameters are missing",
                hint: "Email, password and key are necessary",
                type: "WARNING",
                code: 4
            });
        }

        if (await checkInRedisCache(email)) {
            return res.send({
                msg: "User is already registered",
                type: "WARNING",
                code: 2
            });
        }

        if (!verifyHMAC(email, key)) {
            return res.send({
                msg: "Key is incorrect",
                type: "WARNING",
                code: 1
            });
        }

        const securePassword = await hash(password, 10);

        const addUserToDb = await userModel
            .create({
                email,
                password: securePassword,
                name: userName,
                phone: phoneNumber
            })
            .catch((err) => console.log(err.message));

        if (!addUserToDb) {
            return res.send({
                msg: "Something went wrong while adding user to database",
                type: "ERROR",
                code: 3
            });
        }

        const addUserToRedis = await redis.pipeline().set(email, addUserToDb).expire(email, 864000).exec();

        const { _id } = addUserToDb._doc;

        const userAuthToken = await sign({ id: _id, userName: email }, process.env.NEXT_PUBLIC_USER_JWT_SECRET_KEY, { expiresIn: "10d" });

        return res.send({
            msg: "user registered",
            userAuthToken,
            cached: addUserToRedis && true,
            database: true,
            userNetworkIP: req?.ip,
            code: 200,
            type: "SUCCESS"
        });
    } catch (requestError) {
        return res.send({
            msg: requestError.message,
            code: 3
        });
    }
}
