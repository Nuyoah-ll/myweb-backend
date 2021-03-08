const jwt = require("jsonwebtoken");

const errorTypes = require("../constants/error-types");
const config = require("../app/config");

const authService = require("../service/auth.service");

// 判断用户是否登录
async function verifyAuth(ctx, next) {
  try {
    // 1.获取token
    const authorization = ctx.headers.authorization;
    const token = authorization.replace("Bearer ", "");

    // 2.解析token
    const user = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ["RS256"]
    });

    ctx.user = user;
    await next();

  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZED);
    ctx.app.emit("error", error, ctx);
  }
}

// 删除修改动态、评论、头像、标签等等是否具备权限
async function verifyPermission(ctx, next) {
  const [paramsKey] = Object.keys(ctx.request.params);
  const tableName = paramsKey.replace("Id", "s");
  const resourceId = ctx.request.params[paramsKey];
  const { id } = ctx.user;

  const isPermitted = await authService.checkResource(tableName, resourceId, id);
  if (!isPermitted) {
    const error = new Error(errorTypes.NO_PERMISSION);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
}

module.exports = {
  verifyAuth,
  verifyPermission
}