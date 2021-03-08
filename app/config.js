// 专门用于处理.env文件信息的
const fs = require("fs");
const { resolve } = require("path");

const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = fs.readFileSync(resolve(__dirname, "../keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(resolve(__dirname, "../keys/public.key"));

module.exports = {
  APP_HOST,
  APP_PORT,
  STATIC_HOST,
  STATIC_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

// 把这两个私钥和公钥放到导出的对象上
module.exports.SECRET_KEY = SECRET_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;