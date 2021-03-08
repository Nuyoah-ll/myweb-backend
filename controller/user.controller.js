const userService = require("../service/user.service");
const fs = require("fs");

class userController {
  async getAvatarInfoById(ctx, next) {
    const { userId } = ctx.params;
    // 在数据库中查询到图像的信息
    const result = await userService.getAvatarInfoById(userId);
    console.log(result, "该用户的所有头像");
    ctx.response.set("content-type", result[0].mimetype);
    ctx.body = fs.createReadStream(`./upload/avatar/${result[0].filename}`);
  }

  async getAvatarInfoByFilename(ctx, next) {
    const { filename } = ctx.params;
    const result = await userService.getAvatarInfoByFilename(filename);
    ctx.response.set("content-type", result[0].mimetype);
    ctx.body = fs.createReadStream(`./upload/avatar/${result[0].filename}`);
  }

  async getHistoryAvatars(ctx, next) {
    const { userId } = ctx.params;
    // 在数据库中查询到图像的信息
    const result = await userService.getAvatarInfoById(userId);
    const historyAvatars = [];
    for (let item of result) {
      historyAvatars.push(`http://${APP_HOST}:${APP_PORT}/user/avatar/${item.filename}`);
    }
    ctx.body = historyAvatars;
  }
}

module.exports = new userController();