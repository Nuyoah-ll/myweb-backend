const errorTypes = require("../constants/error-types");
const service = require("../service/register.service");
const md5password = require("../utils/pwd-encryption");

async function verifyUser(ctx, next) {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 用户名仅支持数字字母下划线和中文，中文算一个字符，用户名必须大于2位，小于10位
  // 密码仅支持数字字母下划线，以及下面这些特殊字符：. ! @ # $ % ^ & * ( ) - = + ~ ` | \ / ? { } [ ]，长度为6-18位
  const usernameRegExp = /^[\w\u4E00-\u9FA5]{2,10}$/g;
  const passwordRegExp = /^[\w.!@#$%\^&*\(\)\-=+~`|\\/?{}\[\]]{6,18}$/g;

  if (!usernameRegExp.test(username)) {
    const error = new Error(errorTypes.FORMAT_OF_USERNAME_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }
  if (!passwordRegExp.test(password)) {
    const error = new Error(errorTypes.FORMAT_OF_PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await service.queryUsername(username);
  if (result[0].length) {
    const error = new Error(errorTypes.USERNAME_iS_ALREADY_EXIST);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
}

async function pwdEncryption(ctx, next) {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}

module.exports = {
  verifyUser,
  pwdEncryption
}