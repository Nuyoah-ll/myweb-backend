const connection = require("../app/database");

class TagService {

  /**
   * 将单个标签插入tags表里
   */
  async createTag(tagName) {
    let statement = "SELECT id,tag_name from tags where tag_name = ?";
    const result = await connection.execute(statement, [tagName]);

    if (!result[0].length) {
      statement = "INSERT INTO tags(tag_name) VALUES(?)";
      const result = await connection.execute(statement, [tagName]);
      return { id: result[0].insertId, tagName };
    }

    return result[0][0];
  }


  /**
   * 将一组标签（数组）插入tags表里，并且返回这一组标签的id和tag_name
   */
  async addTag(tags) {
    const beAttachedTags = [];
    for (let name of tags) {
      const res = await this.createTag(name);
      beAttachedTags.push(res);
    }
    return beAttachedTags;
  }

  /**
   * 查询数据库中所有的标签
   */
  async getTagList(){
    const statement = `SELECT tag_name FROM tags`;
    const result = await connection.execute(statement);
    return result[0];
  }
}

module.exports = new TagService();