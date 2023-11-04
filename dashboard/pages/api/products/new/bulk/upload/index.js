import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";
import { csvToObjectParser } from "@/utils/helper/parser/csv/csv";

export default async function (req, res) {
  const { method } = req;
  if (method !== "POST") {
    return res.send({
      msg: "Request method now valid"
    });
  } else {
    dbConnect();
    const { csvLink } = req.body;
    if (!csvLink) {
      return res.send({
        msg: "CSV link should be provided"
      });
    }
    const linkRegex = /\bhttps:\/\/\S+/g;
    const match = csvLink.match(linkRegex);
    if (!match) {
      return res.send({
        msg: "Link in not valid",
        required: "Link should be secure"
      });
    }
    const parseCSV = await csvToObjectParser(csvLink);
    const finalData = mergeData(parseCSV);
    const dataBulkProductsToDatabase = await productModel.insertMany(finalData);
    res.send(dataBulkProductsToDatabase);
  }
}

const mergeData = (data) => {
  const featuredImgs = mergeImages(data);
  const categories = mergeCategories(featuredImgs);
  return categories;
};

const mergeImages = (data) => {
  const mergeData = data.map((item) => {
    const { featuredImage1, featuredImage2, featuredImage3, ...rest } = item;
    const featuredImages = [featuredImage1, featuredImage2, featuredImage3];
    const finalObject = { ...rest, featuredImages };
    return finalObject;
  });
  console.log(mergeData);
  return mergeData;
};

const mergeCategories = (data) => {
  const mergeData = data.map((item) => {
    const { categorie1, categorie2, categorie3, ...rest } = item;
    const categories = [categorie1, categorie2, categorie3];
    const finalObject = { ...rest, categories };
    return finalObject;
  });

  return mergeData;
};
