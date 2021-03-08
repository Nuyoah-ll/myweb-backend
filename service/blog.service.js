const connection = require("../app/database");
const tagService = require("../service/tag.service");

class BlogService {
  async insertBlog(id, title, abstract, content) {
    const statement = `INSERT INTO blogs(title,abstract,content,user_id) VALUES(?,?,?,?)`;
    const result = await connection.execute(statement, [title, abstract, content, id]);
    return result[0];
  }

  async updateBlog(content, blogId) {
    const statement = `UPDATE blogs SET content = ? WHERE id = ?`;
    const result = await connection.execute(statement, [content, blogId]);
    return result[0];
  }

  async deleteBlog(blogId) {
    const statement = "DELETE FROM blogs WHERE id = ?";
    const result = await connection.execute(statement, [blogId]);
    return result[0];
  }

  async getBlogById(blogId) {
    const statement = `
      SELECT 
        b.id,b.title,b.abstract,content,
        JSON_OBJECT("id",u.id,"username",u.username) user,
        b.createAt createTime,b.updateAt updateTime,
        IF(tb.blog_id,JSON_ARRAYAGG(
          JSON_OBJECT("id",t.id,"tagName",t.tag_name)
        ),NULL) tags,
        (
          SELECT count(*) from comments where b.id = comments.blog_id group by comments.blog_id
        ) commentCount
      FROM 
        blogs b
      LEFT JOIN 
        users u
      ON
        b.user_id = u.id
      LEFT JOIN
        blogs_tags tb
      ON 
        b.id = tb.blog_id
      LEFT JOIN 
        tags t
      ON 
        t.id = tb.tag_id
      WHERE
        b.id = ?
      GROUP BY
        b.id
      ORDER BY
        b.createAt DESC
    `
    const result = await connection.execute(statement, [blogId]);
    return result;
  }

  async queryBlogList(offset, size) {
    const statement = `
      SELECT 
        b.id,b.title,b.abstract,content,
        JSON_OBJECT("id",u.id,"username",u.username) user,
        b.createAt createTime,b.updateAt updateTime,
        IF(tb.blog_id,JSON_ARRAYAGG(
          JSON_OBJECT("id",t.id,"tagName",t.tag_name)
        ),NULL) tags,
        (
          SELECT count(*) from comments where b.id = comments.blog_id group by comments.blog_id
        ) commentCount
      FROM 
        blogs b
      LEFT JOIN 
        users u
      ON
        b.user_id = u.id
      LEFT JOIN
        blogs_tags tb
      ON 
        b.id = tb.blog_id
      LEFT JOIN 
        tags t
      ON 
        t.id = tb.tag_id
      GROUP BY
        b.id
      ORDER BY
        b.createAt DESC
      LIMIT
        ?,?
    `
    const result = await connection.execute(statement, [offset, size]);
    return result;
  }

  async hasTag(blogId, TagId) {
    const statement = "SELECT * FROM blogs_tags WHERE blog_id = ? AND tag_id = ?";
    const result = await connection.execute(statement, [blogId, TagId]);
    return !!result[0].length;
  }

  async attachTag(blogId, tagId) {
    const statement = "INSERT INTO blogs_tags(blog_id,tag_id) VALUES(?,?)";
    const result = await connection.execute(statement, [blogId, tagId]);
    return result;
  }
}

module.exports = new BlogService();