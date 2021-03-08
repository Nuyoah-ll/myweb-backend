const connection = require("../app/database");

class AuthService {
  async checkResource(tableName, resourceId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`;
    const result = await connection.query(statement, [resourceId, userId]);
    return !!result[0][0];
  }
}

module.exports = new AuthService();