import OpenAI from "openai";
import { GPT_CONFIG } from "./config/credentials";

export const generateProductDescriptionUsingAI = async (productName) => {
  try {
    const openAI = new OpenAI(GPT_CONFIG);
    const description = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            `I am adding ${productName} as a product in my ecommerce store so i need a description for specifically this product, cover topics such as benefits of this product, specifications on this product in table format, and Height, weight, care guide and every possible aspect,  make sure you give me right description for this product. make sure that you only provide me markdown with tables and headings, and dont write things like Sure, here's an example of a description that covers the benefits, specifications, care guide, and other relevant information for the plant be straight to the point and start with the important content and mention "\n" whereever there is line break and such things`
        }
      ],
      temperature: 1,
      max_tokens: 1919,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    return {
      code: 1,
      response: description
    };
  } catch (err) {
    return {
      code: 0,
      response: err
    };
  }
};
