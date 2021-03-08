const connection = require("../app/database");

class fileService {
  async createAvatar(mimetype, filename, size, userId) {
    const statement = `INSERT INTO avatars(filename,mimetype,size,user_id) VALUES(?,?,?,?)`;
    const result = await connection.execute(statement, [filename, mimetype, size, userId]);
    return result;
  }

  async savePictureInfo(id, momentId, mimetype, filename, size) {
    const statement = `INSERT INTO moment_picture(user_id,moment_id,mimetype,filename,size) VALUES(?,?,?,?,?)`;
    const result = await connection.execute(statement, [id, momentId, mimetype, filename, size]);
    return result;
  }

  async saveMusicInfo(mimetype, filename, size, name, author, lyric) {
    const statement = 'INSERT INTO musics(mimetype,filename,size,name,author,lyric) VALUES(?,?,?,?,?,?)';
    const result = await connection.execute(statement, [mimetype, filename, size, name, author, lyric]);
    return result;
  }

  async queryMusicList(filename = "") {
    if (filename) {
      const statement = `SELECT mimetype,size FROM musics WHERE filename = ?`;
      const result = await connection.execute(statement, [filename]);
      return result[0];
    }
    const statement = `SELECT * FROM musics`;
    const result = await connection.execute(statement);
    return result[0];
  }
}

module.exports = new fileService();