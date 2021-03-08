const connection = require("../app/database");

class registerService {
  async create(user) {
    const { username, password } = user;
    const statement = `INSERT INTO users (username,password) VALUES (?,?)`;
    const result = await connection.execute(statement, [username, password]);

    return result;
  }

  async queryUsername(username) {
    const statement = `SELECT * FROM users where username = (?)`;
    const result = await connection.query(statement, [username]);
    return result;
  }
}

module.exports = new registerService();