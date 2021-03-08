const connection = require("../app/database");


const sqlFragment = `
  SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT("id", u.id, "username", u.username, "createTime", u.createAt, "updateTime", u.updateAt) user,
    ( SELECT COUNT(*) FROM comments WHERE moment_id = m.id ) commentCount,
    ( SELECT 
        JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/pictures/',mp.filename)) 
      FROM 
        moment_picture mp
      WHERE 
        mp.moment_id = m.id
    ) pictures
  FROM 
    moments m
  LEFT JOIN
   users u
  ON 
    m.user_id = u.id
`

class MomentService {
  async insertMoment(userId, content) {
    const statement = "INSERT INTO moments(content,user_id) VALUES(?,?)";
    const result = await connection.execute(statement, [content, userId]);
    return result;
  }


  async queryMomentById(momentId) {
    const statement = `
      ${sqlFragment}
      WHERE
        m.id = ?;
    `;
    const result = await connection.query(statement, [momentId]);
    return result;
  }

  async queryMomentByOffsetAndSize(offset, size) {
    const statement = `
      ${sqlFragment}
      LIMIT ?,?;
    `;
    const result = await connection.query(statement, [offset, size]);
    return result;
  }

  async updateMoment(newContent, momentId) {
    const statement = `UPDATE moments SET content = ? WHERE id = ?`;
    const result = await connection.execute(statement, [newContent, momentId]);
    return result;
  }

  async deleteMoment(momentId) {
    const statement = `DELETE FROM moments WHERE id = ?`;
    const result = await connection.execute(statement, [momentId]);
    return result;
  }

  async getMomentPictureByFilename(filename) {
    const statement = `SELECT * from moment_picture where filename = ?`;
    const result = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new MomentService();