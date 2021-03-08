const KoaRouter = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { createTag, getTagList } = require("../controller/tag.controller");
const tagRouter = new KoaRouter({ prefix: "/tag" });

// 给定一个标签名，单独创建一个标签
tagRouter.post("/", verifyAuth, createTag);

// 获取数据库中所有已存在的标签列表
tagRouter.get("/", getTagList);


module.exports = tagRouter;