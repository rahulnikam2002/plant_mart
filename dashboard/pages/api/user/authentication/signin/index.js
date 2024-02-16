import { redis } from "@/lib/redis/connect.redis";
import userModel from "@/models/auth/user.model";
import { checkInRedisCache } from "@/utils/cache/redis";
import dbConnect from "@/utils/database/mongodb.connect";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    if (method !== "POST") {
        return res.send({
            msg: "Invalid request",
            code: 4,
            type: "ERROR"
        });
    }
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.send({
                msg: "Validation failed",
                code: 4,
                type: "WARNING"
            });
        }

        const userInRedis = await checkInRedisCache(email);
        if (userInRedis) {
            const hashedPassword = userInRedis.value.password;
            const userName = userInRedis.value.name;
            const id = userInRedis.value._id;
            await authenticateuser(email, hashedPassword, password, userName, id, true, null, res);
        } else {
            const userInDatabase = await userModel.findOne({ email }).select("email password");
            if (!userInDatabase) {
                return res.send({
                    msg: "User not registered",
                    type: "WARNING",
                    code: 6
                });
            }
            const hashedPassword = userInDatabase._doc.password;
            const id = userInDatabase._doc._id;
            const userName = userInDatabase._doc.name;
            await authenticateuser(email, hashedPassword, password, userName, id, false, userInDatabase, res);
        }
    } catch (requestError) {
        return res.send({
            msg: requestError.message,
            code: 3,
            type: "ERROR"
        });
    }
}

const authenticateuser = async (email, hashedPassword, plainPassword, userName, id, isCached, user, res) => {
    const comparePassword = await compare(plainPassword, hashedPassword);
    if (!comparePassword) {
        return res.send({
            msg: "Incorrect details",
            code: 5,
            type: "WARNING"
        });
    }

    const userToken = await sign({ id, userName, email }, process.env.NEXT_PUBLIC_USER_JWT_SECRET_KEY, { expiresIn: "10d" });

    if (!isCached) {
        await redis.pipeline().set(email, user).expire(email, 864000).exec();
    }

    return res.send({
        msg: "User login success",
        userAuthToken: userToken,
        type: "SUCCESS"
    });
};
