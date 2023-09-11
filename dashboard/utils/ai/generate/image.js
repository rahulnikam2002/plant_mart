import OpenAI from "openai";
import { GPT_CONFIG } from "./config/credentials";

export const generateImageUsingAI = async (plantName) => {
  try {
    const openAI = new OpenAI(GPT_CONFIG);

    const image = await openAI.images.generate({
      prompt: `generate an image for ${plantName}`,
      size: "512x512",
      response_format: "url",
      n: 4
    });
    return image;
  } catch (err) {
    return {
      code: 0,
      response: err
    };
  }
};
