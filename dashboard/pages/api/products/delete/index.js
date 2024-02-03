import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";
import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "POST") {
    return res.send({
      msg: "Invlaid request"
    });
  }
  try {
    await dbConnect();
    console.log(true);
    const cookie = req.cookies.token;

    if (!cookie) {
      return res.send({
        msg: "You cannot perform this operation",
        err: "COOKIE_NOT_PRESENT"
      });
    }

    const verifyAdmin = await adminVerification(cookie);

    if (verifyAdmin.code !== 1) {
      return res.send({
        msg: "You cannot perform this operation",
        err: "COOKIE_INVALID"
      });
    }

    const { id } = req.body;

    if (!id) {
      return res.send({
        msg: "Product id must be valid"
      });
    }

    const deleteProductWithID = await productModel.deleteOne({ _id: id });
    if (!deleteProductWithID) {
      return res.send({
        msg: "Something went wrong while performing this operation"
      });
    }
    return res.send({
      msg: `Product with id ${id} was deleted successfully`
    });
  } catch (requestError) {
    return res.send({
      error: requestError.message,
      requestError
    });
  }
}
