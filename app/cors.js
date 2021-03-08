const { STATIC_HOST, STATIC_PORT } = require("./config");

function cors(app) {
  // 解决跨域问题
  app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", `http://${STATIC_HOST}:${STATIC_PORT}`);
    ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with,accept,origin,content-type,authorization");
    ctx.set("Content-Type", "application/json;charset=utf-8");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Max-Age", 300);
    ctx.set("Access-Control-Expose-Headers", "myData");
    if (ctx.request.method === "OPTIONS") {
      ctx.body = "OK";
      return;
    }

    await next();
  })
}

module.exports = cors;