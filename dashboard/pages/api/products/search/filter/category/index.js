import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";

const PRODUCTS_PER_PAGE_IN_PAGINATION = 3;

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "GET") {
    return res.send({
      msg: "Invalid method"
    });
  }
  try {
    await dbConnect();
    const { category, page, limit } = req.query;
    const filter = {
      categories: { $in: [category] }
    };
    let skip, products;
    switch (true) {
      case category !== undefined && page === undefined && limit === undefined:
        const productsWithCategory = await productModel.find(filter);
        res.send(productsWithCategory);
        break;
      case category !== undefined && page !== undefined && limit === undefined:
        skip = (page - 1) * PRODUCTS_PER_PAGE_IN_PAGINATION;
        products = await productModel
          .find(filter)
          .skip(skip)
          .limit(PRODUCTS_PER_PAGE_IN_PAGINATION);
        if (!products) {
          return res.send({
            msg: "No products found"
          });
        }
        return res.send(products);
        break;
      case category !== undefined && page === undefined && limit !== undefined:
        products = await productModel.find(filter).limit(limit);
        if (!products) {
          return res.send({
            msg: "No products found"
          });
        }
        return res.send(products);
        break;
      case category !== undefined && page !== undefined && limit !== undefined:
        skip = (page - 1) * limit;
        products = await productModel.find().skip(skip).limit(limit);
        if (!products) {
          return res.send({
            msg: "No products found"
          });
        }
        return res.send(products);
        break;
      default:
        return res.send({
          msg: "No valid query was received"
        });
        break;
    }
  } catch (requestError) {
    return res.send({
      error: requestError.message
    });
  }
}
