const jwt = require("jsonwebtoken");

const config = require("../app/config");

class loginController {

  async login(ctx, next) {
    // 获取到用户的信息
    const { id, username } = ctx.user;
    // 生成token
    const token = jwt.sign({ id, username }, config.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    });
    ctx.body = { id, username, token };
  }
  
}

module.exports = new loginController();