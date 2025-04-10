import CryptoJS from 'crypto-js';

export const encryptData = (data, key) => CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
export const decryptData = (cipher, key) => {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
