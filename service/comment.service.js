const connection = require("../app/database");

class CommentService {
  async queryMainComment(momentId) {
    const statement = `
      SELECT
        c.id,content,moment_id,c.createAt createTime,
        JSON_OBJECT("id",u.id,"username",u.username) user,
        ( SELECT COUNT(*) FROM comments WHERE comment_id = c.id ) commentCount
      FROM
        comments c
      LEFT JOIN 
        users u 
      ON u.id = c.user_id
      WHERE
        moment_id = ? AND comment_Id IS NULL
      ORDER BY c.createAt DESC
    `;
    const result = await connection.execute(statement, [momentId]);
    return result;
  }

  async querySubComment(commentId) {
    const statement = `
      SELECT
        c1.id,c1.content,c1.moment_id,c1.createAt createTime,
        JSON_OBJECT("id",u.id,"username",u.username) user,
        ( SELECT COUNT(*) FROM comments WHERE comment_id = c1.id ) commentCount
      FROM 
        comments c1
      JOIN
        comments c2
      ON 
        c1.comment_id = c2.id
      LEFT JOIN 
        users u
      ON
        u.id = c1.user_id
      WHERE 
        c1.comment_id = ?
      ORDER BY 
        c1.createAt DESC
    `;
    const result = await connection.execute(statement, [commentId]);
    return result;
  }

  async queryBlogComment(blogId) {
    const statement = `
      SELECT
        c.id,content,blog_id,c.createAt createTime,
        JSON_OBJECT("id",u.id,"username",u.username) user,
        ( SELECT COUNT(*) FROM comments WHERE comment_id = c.id ) commentCount
      FROM
        comments c
      LEFT JOIN 
        users u 
      ON u.id = c.user_id
      WHERE
        blog_id = ?
      ORDER BY c.createAt DESC
    `;
    const result = await connection.execute(statement, [blogId]);
    return result;
  }

  async insertComment(userId, momentId, content, commentId = null, blogId = null) {
    console.log(arguments);
    const statement = `INSERT INTO comments (user_id,moment_id,content,comment_id,blog_id) VALUES (?,?,?,?,?)`;
    const result = await connection.execute(statement, [userId, momentId, content, commentId, blogId]);

    return result;
  }

  async updateComment(commentId, newContent) {
    const statement = `UPDATE comments SET content = ? WHERE id = ?`;
    const result = await connection.execute(statement, [newContent, commentId]);
    return result;
  }

  async deleteComment(commentId) {
    const statement = `DELETE FROM comments WHERE id = ?`;
    const result = await connection.execute(statement, [commentId]);
    return result;
  }

}

module.exports = new CommentService();