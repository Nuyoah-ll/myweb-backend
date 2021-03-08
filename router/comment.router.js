const KoaRouter = require("koa-router");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { getComment, createComment, replyComment, updateComment, deleteComment } = require("../controller/comment.controller");

const commentRouter = new KoaRouter({ prefix: "/comment" });


// 创建动态评论
commentRouter.post("/:momentId", verifyAuth, createComment);
// 创建博客评论
commentRouter.post("/blog/:blogId", verifyAuth, createComment);
// 回复评论
commentRouter.post("/reply/:commentId", verifyAuth, replyComment);
// 修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, updateComment);
// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, deleteComment);
// 根据level和动态/评论的id（momentOrCommentId）获取他们的下级评论
commentRouter.get("/", getComment);

module.exports = commentRouter;