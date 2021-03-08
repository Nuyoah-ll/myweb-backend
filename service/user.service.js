const connection = require("../app/database");

class userService {
  async getAvatarInfoById(userId) {
    const statement = `SELECT * from avatars WHERE user_id = ? ORDER BY createAt DESC`;
    const result = await connection.execute(statement, [userId]);
    return result[0];
  }

  async getAvatarInfoByFilename(filename) {
    const statement = `SELECT * from avatars WHERE filename = ?`;
    const result = await connection.execute(statement, [filename]);
    return result[0];
  }

  async insertAvatarUrl(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`;
    const result = await connection.execute(statement, [avatarUrl, userId]);
    return result[0];
  }
}

module.exports = new userService();