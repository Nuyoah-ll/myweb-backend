const KoaRouter = require("koa-router");

const loginRouter = new KoaRouter({ prefix: "/login" });

const {
  login
} = require("../controller/login.controller");

const {
  verifyLogin,
  verifyAdmin
} = require("../middleware/login.middleware");

const {
  verifyAuth
} = require("../middleware/auth.middleware");

// 验证填写登录表单时的接口
loginRouter.post("/", verifyLogin, login);
// 单纯的验证身份，验证是否登录的接口
loginRouter.post("/test", verifyAuth, (ctx, next) => {
  ctx.body = ctx.user;
});

module.exports = loginRouter;