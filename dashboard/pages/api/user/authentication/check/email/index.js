import { doUserExist } from "@/utils/helper/authentication/user/check.isRegistered";
import dbConnect from "@/utils/database/mongodb.connect";
import { createHash } from "crypto";
import { checkInRedisCache } from "@/utils/cache/redis";

export default async function handler(req, res) {
    const { method } = req;
    if (method !== "POST") {
        return res.send({
            msg: "Invalid request"
        });
    }
    try {
        await dbConnect();
        const { email } = req.body;
        console.log(email);
        const isInCache = await checkInRedisCache(email);
        let isUserRegistered;
        if (!isInCache) {
            console.log(1);
            isUserRegistered = await doUserExist(email);
            console.log(isUserRegistered);
            return res.send({
                type: "SUCCESS",
                isUserRegistered,
                source: "DATABASE"
            });
        }
        return res.send({
            type: "SUCCESS",
            isUserRegistered: true,
            isInCache,
            source: "Cache"
        });
    } catch (requestError) {
        return res.send({
            msg: requestError.message,
            type: "ERROR"
        });
    }
}
