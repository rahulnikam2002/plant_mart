import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";

const PRODUCTS_PER_PAGE_IN_PAGINATION = 30;

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "GET") {
    return res.send({
      msg: "Invalid method"
    });
  }
  try {
    await dbConnect();
    const isQueryEmpty = Object.keys(req.query).length === 0;
    const { limit, page } = req.query;
    if (isQueryEmpty) {
      const allProducts = await productModel.find({});
      if (!allProducts) {
        return res.send({
          msg: "No products found"
        });
      }
      return res.send(allProducts);
    } else {
      switch (true) {
        case limit !== undefined && page === undefined:
          await sendProductsByLimit(limit, res);
          break;
        case limit === undefined && page !== undefined:
          await sendProductsByPages(page, res);
          break;
        case limit !== undefined && page !== undefined:
          await sendProductsByPageAndLimit(limit, page, res);
          break;
        default:
          return res.send({
            msg: "No valid query was received"
          });
      }
    }
  } catch (requestError) {
    return res.send({
      error: requestError.message
    });
  }
}

const sendProductsByLimit = async (limit, res) => {
  if (limit > 200) {
    return res.send({
      warning: "Maximum limit is of 200",
      msg: "you can try /api/products/get for fetch all products"
    });
  }
  const products = await productModel.find().limit(limit);
  if (!products) {
    return res.send({
      msg: "No products found"
    });
  }
  return res.send(products);
};

const sendProductsByPages = async (pageNo, res) => {
  if (pageNo <= 0) {
    return res.send({
      msg: "page query value must be >= 0"
    });
  }

  const skip = (pageNo - 1) * PRODUCTS_PER_PAGE_IN_PAGINATION;
  const products = await productModel
    .find()
    .skip(skip)
    .limit(PRODUCTS_PER_PAGE_IN_PAGINATION);
  if (products.length === 0) {
    return res.send({
      msg: "No products found"
    });
  }
  return res.send(products);
};

const sendProductsByPageAndLimit = async (limit, pageNo, res) => {
  if (limit > 200 && pageNo <= 0) {
    return res.send({
      warning: "Maximum limit is of 200 and page query value must be >= 0 ",
      msg: "you can try /api/products/get for fetch all products"
    });
  }

  const skip = (pageNo - 1) * limit;
  const products = await productModel.find().skip(skip).limit(limit);
  if (products.length === 0) {
    return res.send({
      msg: "No products found"
    });
  }
  return res.send(products);
};

/**
 * products per page => 30
 * 1 => 1 - 30
 * 2 => 31 - 60
 * 3 => 61 - 90
 *
 *  page - 1 * perPage
 *  1 - 1 * 30 = 0
 *  2 - 1 * 30 = 30
 *  3 - 1 * 30 = 60
 */
