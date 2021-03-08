const KoaRouter = require("koa-router");

const blogRouter = new KoaRouter({ prefix: "/blog" });
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");

const {
  createBlog,
  getBlogDetail,
  getBlogList,
  attachTag,
  updateBlog,
  deleteBlog
} = require("../controller/blog.controller");

// 创建博客
blogRouter.post("/", verifyAuth, createBlog);
// 根据博客的id修改博客内容
blogRouter.patch("/:blogId", verifyAuth, verifyPermission, updateBlog);
// 根据博客的id删除博客内容
blogRouter.delete("/:blogId", verifyAuth, verifyPermission, deleteBlog);
// 根据博客的id获取博客
blogRouter.get("/:blogId", getBlogDetail);
// 根据offset和size获取博客的列表
blogRouter.get("/", getBlogList);
// 给博客加上标签
blogRouter.post("/:blogId/tag", verifyAuth, attachTag);

module.exports = blogRouter;