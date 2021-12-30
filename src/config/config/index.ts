import dotenv from "dotenv";
console.log("dir:", __dirname);

dotenv.config();

const SERVER_PORT = Number(process.env.SERVER_PORT) || 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "";

const MONGO_PW = process.env.MONGO_PW || "";
const MONGO_NAME = process.env.MONGO_NAME || "";
const MONGO_URI = `mongodb+srv://${MONGO_NAME}:${MONGO_PW}@cluster0.qjioi.mongodb.net/memory?retryWrites=true&w=majority`;

const PHONE_KEY = process.env.PHONE_KEY || "";
const PHONE_IV = process.env.PHONE_IV || "";

const EMAIL_KEY = process.env.EMAIL_KEY || "";
const EMAIL_IV = process.env.EMAIL_IV || "";

const JWT_SECRET = process.env.JWT_SECRET || "";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};
const MONGO = {
  uri: MONGO_URI,
};
const ENCRYPT = {
  key: PHONE_KEY,
  iv: PHONE_IV,
  jwt: JWT_SECRET,
};
const config = {
  server: SERVER,
  mongo: MONGO,
  encrypt: ENCRYPT,
};
// console.log(config);
export default config;
