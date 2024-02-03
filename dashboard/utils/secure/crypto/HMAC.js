import crypto from "crypto"

const defaultSecretKey = process.env.NEXT_PUBLIC_HMAC_SECRECT_KEY;

export const generateHMAC = (plainText, secretKey = defaultSecretKey) => {
    console.log(secretKey)
    const hmac = crypto.createHmac('sha256', secretKey);
    const cipherText = hmac.update(plainText).digest('hex');
    return cipherText;
}

export const verifyHMAC = (plainText, cipherText, secretKey) => {
    console.log(secretKey)
    const decryptedCipher = generateHMAC(plainText, secretKey ? secretKey : defaultSecretKey);
    return cipherText === decryptedCipher;
}