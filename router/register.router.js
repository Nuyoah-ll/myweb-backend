// 注册接口相关的逻辑
const Router = require("koa-router");
const registerRouter = new Router({ prefix: "/register" });

const {
  verifyUser,
  pwdEncryption
} = require("../middleware/register.middleware");

const {
  create
} = require("../controller/register.controller");

registerRouter.post("/", verifyUser, pwdEncryption, create);

module.exports = registerRouter;