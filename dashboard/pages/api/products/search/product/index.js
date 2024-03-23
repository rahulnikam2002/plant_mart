import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";

dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    if (method !== "GET") {
        return res.send({
            msg: "Invlaid request"
        });
    }

    try {
        const { name } = req.query;
        if (!name) {
            return res.send({
                msg: "Name query is required"
            });
        }

        const searchTerms = name.split(" ");
        const regex = new RegExp(searchTerms.join("|"), "i");

        const searchResult = await productModel.find({
            productName: { $regex: regex }
        });

        res.send(searchResult);
    } catch (requestError) {
        return res.send({
            err: requestError.message
        });
    }
}
