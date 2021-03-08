const app = require("./app/index");
require("./app/database");

app.listen(8000, err => {
  if (err) {
    console.log("服务器启动失败");
    console.log(err);
  } else {
    console.log("服务器启动成功");
  }
})