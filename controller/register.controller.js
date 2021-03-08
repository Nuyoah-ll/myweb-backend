const registerService = require("../service/register.service");

class RegisterController {
  async create(ctx, next) {
    const user = ctx.request.body;
    await registerService.create(user);
    ctx.body = "注册成功";
  }
}

module.exports = new RegisterController();