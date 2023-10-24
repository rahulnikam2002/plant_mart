import { csvToObject } from "easy-csv-parser";

export const csvToObjectParser = async (link) => {
  if (!link) {
    return {
      msg: "Invalid Link"
    };
  }
  const csvLink = link;
  const result = await csvToObject(csvLink);

  if (result.status === 200) {
    return result.data;
  } else if (result.status === 400) {
    return result.message;
  } else {
    return result.message;
  }
};
