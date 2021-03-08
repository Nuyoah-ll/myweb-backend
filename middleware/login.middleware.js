const errorTypes = require("../constants/error-types");
const registerService = require("../service/register.service");
const md5password = require("../utils/pwd-encryption");


async function verifyLogin(ctx, next) {
  const { username, password, admin } = ctx.request.body;
  if (!username || !password) {
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await registerService.queryUsername(username);
  if (!result[0].length) {
    const error = new Error(errorTypes.USERNAME_IS_NOT_EXIST);
    return ctx.app.emit("error", error, ctx);
  }

  if (md5password(password) !== result[0][0].password) {
    const error = new Error(errorTypes.PASSWORD_ERROR);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = result[0][0];

  if(admin === 1){
    if(ctx.user.auth !== 1){
      const error = new Error(errorTypes.NO_PERMISSION);
      return ctx.app.emit("error", error, ctx);
    }
  }
  
  await next();
}

module.exports = {
  verifyLogin
}