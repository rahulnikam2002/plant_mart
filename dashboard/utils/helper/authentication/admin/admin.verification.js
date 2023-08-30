import axios from "axios";

export const adminVerification = async (cookie) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (cookie) {
        const verifyAdmin = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOST}/authentication/verify`,
          { token: cookie }
        );
        if (verifyAdmin.data.code !== 1) {
          reject({ code: 0 });
        }
        resolve({ code: 1 });
      }
      reject({ code: 0 });
    } catch (err) {
      reject({ code: 0 });
    }
  });
};
