const mysql2 = require("mysql2");
const config = require("./config");

// 创建数据库连接
const connection = mysql2.createConnection({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
});

// 监听数据库是否连接成功
connection.connect(err => {
  if (err) {
    console.log("数据库连接失败", err);
  } else {
    console.log("数据库连接成功");
  }
})

// 直接导出promise形式的API对象
module.exports = connection.promise();