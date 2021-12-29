import crypto from "crypto";
import config from "../config";
import jwt from "jsonwebtoken";
interface token extends jwt.JwtPayload {
  id: string;
}
export const hashEncrypt = async (val: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(val);
  const encryptedVal = await crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");
  return encryptedVal;
};

export const AESencrypt = async (val: string): Promise<string> => {
  const encorder = new TextEncoder();
  const data = encorder.encode(val);
  const iv = Buffer.from(config.encrypt.iv, "hex");
  const key = Buffer.from(config.encrypt.key);
  const cipher = await crypto.createCipheriv("aes-256-gcm", key, iv);
  const encryptedVal = await cipher.update(data).toString("hex");
  return encryptedVal;
};

export const AESdecrypt = async (val: string): Promise<string> => {
  const iv = Buffer.from(config.encrypt.iv, "hex");
  const key = Buffer.from(config.encrypt.key);
  const encryptedData = Buffer.from(val, "hex");
  const decipher = await crypto.createDecipheriv("aes-256-gcm", key, iv);
  const decryptedData = await decipher.update(encryptedData).toString();
  return decryptedData;
};

export const generateWebToken = (val: object): [string, string] => {
  const date = new Date().valueOf();
  const access = jwt.sign(
    { ...val, type: "access", exp: Math.floor(date / 1000) + 60 * 30 },
    config.encrypt.jwt,
  );
  const refresh = jwt.sign(
    { ...val, type: "refresh", exp: Math.floor(date / 1000) + 60 * 60 * 24 },
    config.encrypt.jwt,
  );
  return [access, refresh];
};

export const generateToken = (val: object): string => {
  const access = jwt.sign({ ...val }, config.encrypt.jwt);
  return access;
};
export const resolveToken = (tokenString: string): token => {
  return jwt.verify(tokenString, config.encrypt.jwt) as token;
};
