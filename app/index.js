// 这个index.js里是一些对app的操作，比如使用中间件等等。我们不放在index.js入口文件中，不然会让入口文件臃肿
const koa = require("koa");
const bodyParser = require("koa-bodyparser");

const cors = require("./cors");
// 导入use所有router的函数
const useRouter = require("../router");
const errorHandler = require("./error-handler");


const app = new koa();

// 解决跨域问题
cors(app);

app.useRouter = useRouter;

app.use(bodyParser());

// 应用所有的路由
app.useRouter();

app.on("error", errorHandler);

module.exports = app;