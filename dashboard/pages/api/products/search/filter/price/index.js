import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "GET") {
    return res.send({
      msg: "Invalid request"
    });
  }
  try {
    await dbConnect();
    console.log(1);
    const { minprice, maxprice } = req.query;
    switch (true) {
      case minprice !== undefined && maxprice === undefined:
        await getProductbyPriceRange(0, parseFloat(minprice), res);
        break;
      case minprice === undefined && maxprice !== undefined:
        console.log(3);
        await getProductbyPriceRange(
          parseFloat(maxprice),
          1000000000000000000000000000000000000,
          res
        );
        break;
      case minprice !== undefined && maxprice !== undefined:
        console.log(4);
        await getProductbyPriceRange(
          parseFloat(minprice),
          parseFloat(maxprice),
          res
        );
        break;
      default:
        res.send({
          msg: "Invalid query"
        });
        break;
    }
  } catch (requestError) {
    return res.send({
      err: requestError.message
    });
  }
}

const getProductbyPriceRange = async (minPrice, maxPrice, res) => {
  console.log({ minPrice, maxPrice });
  console.log(typeof minPrice);
  dbConnect();
  console.log(minPrice, maxPrice);
  const productByPriceFilter = await productModel.find({
    $expr: {
      $and: [
        { $gte: [{ $toDouble: "$salePrice" }, minPrice] },
        { $lte: [{ $toDouble: "$salePrice" }, maxPrice] }
      ]
    }
  });
  res.send(productByPriceFilter);
};

/* 
$eq  => Equal
$ne  => Not equal
$gt  => Greater than
$gte => Greater than or equal to 
$lt  => Less than
$lte => Less than or equal to
$in  => It's clear
$nin => Not in
*/
