const momentService = require("../service/moment.service");
const fs = require("fs");

const errorTypes = require("../constants/error-types");

class MomentController {
  async createMoment(ctx, next) {
    // 拿到用户id
    const userId = ctx.user.id;
    // 拿到用户的评论的内容
    const { content } = ctx.request.body;
    // 将这两个数据插入数据库
    await momentService.insertMoment(userId, content);

    ctx.body = "动态发表成功";
  }

  async getMomentDetail(ctx, next) {
    console.log("通过id获取moment");
    // 获取动态参数
    const momentId = ctx.params.momentId;
    const result = await momentService.queryMomentById(momentId);
    ctx.body = result[0];
  }

  async getMomentList(ctx, next) {
    // 获取查询字符串参数
    const { offset = 0, size = 10 } = ctx.query;
    const result = await momentService.queryMomentByOffsetAndSize(offset, size);
    ctx.body = result[0];
  }

  async updateMoment(ctx, next) {
    const momentId = ctx.params.momentId;
    const newContent = ctx.request.body.content;
    await momentService.updateMoment(newContent, momentId);
    ctx.body = "动态修改成功";
  }

  async deleteMoment(ctx, next) {
    const momentId = ctx.params.momentId;
    await momentService.deleteMoment(momentId);
    ctx.body = "动态删除成功";
  }

  async getMomentPicture(ctx, next) {
    const { filename } = ctx.params;
    let { size } = ctx.query;
    const availableSize = ["large", "middle", "small"];
    if (availableSize.indexOf(size) !== -1) {
      size = "-" + size;
    } else {
      size = ""
    };

    const result = await momentService.getMomentPictureByFilename(filename);
    // 如果查询不到结果，则证明数据库里这个资源的数据已经被删除了。
    if(result.length === 0){
      const error = new Error(errorTypes.RESOURCE_NOT_FOUND);
      return ctx.app.emit("error", error, ctx);
    }
    ctx.response.set("content-type", result[0].mimetype);
    ctx.body = fs.createReadStream(`./upload/picture/${result[0].filename}${size}`);
  }
}

module.exports = new MomentController();