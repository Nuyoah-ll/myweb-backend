const tagService = require("../service/tag.service");

class TagController {
  async createTag(ctx,next) {
    const { tagName } = ctx.request.body;
    await tagService.createTag(tagName);
    ctx.body = "标签创建成功";
  }

  async getTagList(ctx,next){
    const result = await tagService.getTagList();
    ctx.body = result;
  }
}

module.exports = new TagController();