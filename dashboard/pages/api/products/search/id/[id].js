import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";

export default async function handler(req, res) {
  console.log("hello");
  const { method } = req;
  if (method !== "GET") {
    return res.send({
      msg: "Invalid request"
    });
  }
  try {
    const { id } = req.query;
    await dbConnect();
    if (!id) {
      return res.send({
        msg: "Invalid product id"
      });
    }
    const productByIdDetails = await productModel.findOne({ _id: id });
    if (!productByIdDetails) {
      return res.send({
        msg: `No product found with id: ${id}`
      });
    }
    res.send(productByIdDetails);
  } catch (requestError) {
    return res.send({
      err: requestError.message
    });
  }
}
