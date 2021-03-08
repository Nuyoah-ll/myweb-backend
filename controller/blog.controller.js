const tagService = require("../service/tag.service");
const blogService = require("../service/blog.service");

class BlogController {
  async createBlog(ctx, next) {
    const { id } = ctx.user;
    const { title, abstract, content } = ctx.request.body;
    const result = await blogService.insertBlog(id, title, abstract, content);
    ctx.body = { id: result.insertId, message: "博客创建成功" };
  }

  async updateBlog(ctx, next) {
    const { content } = ctx.request.body;
    const { blogId } = ctx.params;
    await blogService.updateBlog(content, blogId);
    ctx.body = "博客修改成功";
  }

  async deleteBlog(ctx, next) {
    const { blogId } = ctx.params;
    await blogService.deleteBlog(blogId);
    ctx.body = "博客删除成功";
  }

  async getBlogDetail(ctx, next) {
    const { blogId } = ctx.params;
    console.log(blogId)
    const result = await blogService.getBlogById(blogId);
    ctx.body = result[0];
  }

  async getBlogList(ctx, next) {
    const { offset = '0', size = '10' } = ctx.query;
    const result = await blogService.queryBlogList(offset, size);
    ctx.body = result[0];
  }


  // 给博客附加标签
  async attachTag(ctx, next) {
    // 1.获取标签和博客id。并先将标签都插入一下
    const { tags } = ctx.request.body;
    // 当我们在新建博客时附加标签的时候，这个blogId应该是不存在的，因为博客都没创建出来
    // 我们如果希望在请求创建博客的接口的成功回调里再添加标签，那我们需要将创建博客的接口改一改，让它返回新创建的博客的id
    // 而如果是改变原来博客的标签的时候，则可以穿过来这个blogId
    const { blogId } = ctx.params;
    const result = await tagService.addTag(tags);

    // 2.给博客添加标签
    for (let tag of result) {
      // 2.1 判断标签是否已经绑定给当前博客了
      const hasTag = await blogService.hasTag(blogId, tag.id);
      if (!hasTag) {
        await blogService.attachTag(blogId, tag.id);
      }
    }
    ctx.body = "标签创建成功";
  }
}

module.exports = new BlogController();