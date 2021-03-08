const commentService = require("../service/comment.service");

class CommentController {
  async getComment(ctx, next) {
    let { level, momentOrCommentId } = ctx.query;
    if (level === "1") {
      const result = await commentService.queryMainComment(momentOrCommentId);
      ctx.body = result[0];
    } else if(level === "2"){
      const result = await commentService.querySubComment(momentOrCommentId);
      ctx.body = result[0];
    }else{
      const result = await commentService.queryBlogComment(momentOrCommentId);
      ctx.body = result[0];
    }
  }

  async getCommentCount(ctx, next) {
    let { type, momentOrCommentId } = ctx.query;
    console.log(type, momentOrCommentId);
    if (type === "1") {
      const result = await commentService.queryMainCommentCount(momentOrCommentId);
      ctx.body = result[0][0].commentCount;
    } else {
      const result = await commentService.querySubCommentCount(momentOrCommentId);
      ctx.body = result[0][0].commentCount;
    }
  }

  // 创建博客或者动态的评论
  async createComment(ctx, next) {
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    const { momentId, blogId } = ctx.request.params;
    if (momentId) {
      await commentService.insertComment(id, momentId, content);
      ctx.body = "动态评论发表成功";
    }
    else if (blogId) {
      await commentService.insertComment(id, null, content, null, blogId);
      ctx.body = "博文评论发表成功"
    }
  }

  async replyComment(ctx, next) {
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    const { commentId } = ctx.request.params;
    await commentService.insertComment(id, null, content, commentId);
    ctx.body = "评论发表成功";
  }

  async updateComment(ctx, next) {
    const { content } = ctx.request.body;
    const { commentId } = ctx.request.params;
    await commentService.updateComment(commentId, content);
    ctx.body = "评论修改成功";
  }

  async deleteComment(ctx, next) {
    const { commentId } = ctx.request.params;
    await commentService.deleteComment(commentId);
    ctx.body = "删除评论成功";
  }
}

module.exports = new CommentController();