const fs = require("fs");
const config = require("../app/config");
const fileService = require("../service/file.service.js");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class fileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像信息
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图像信息保存在数据库
    await fileService.createAvatar(mimetype, filename, size, id);
    // 3.将图片的访问接口到users表中的avatar_url字段上（其实就是user.router.js里获取图片的接口地址）
    const avatarUrl = `http://${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
    await userService.insertAvatarUrl(avatarUrl, id);
    ctx.body = "用户上传图像成功";
  }

  async savePictureInfo(ctx, next) {
    // 1.拿到上传的图片的信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.request.params;
    // 2.遍历图片数组，将信息存入数据库
    for (let file of files) {
      const { mimetype, filename, size } = file;
      await fileService.savePictureInfo(id, momentId, mimetype, filename, size);
    }
    // 3.我们不需要在moments表上添加新的保存moments的图片的字段，我们可以在请求moments的时候直接通过查询，返回对应的图片接口就行
    ctx.body = "图片上传成功"
  }

  async saveMusicInfo(ctx, next) {
    const file = ctx.req.file;
    const { name, author, lyric } = ctx.req.body
    const { mimetype, filename, size } = file;
    await fileService.saveMusicInfo(mimetype, filename, size, name, author, lyric);
    ctx.body = "音乐上传成功";
  }

  async getMusicList(ctx, next) {
    const result = await fileService.queryMusicList();
    const musicList = [];
    for (let music of result) {
      const { id, filename, lyric, size, name, author } = music;
      musicList.push({ url: `http://${APP_HOST}:${APP_PORT}/upload/music/${filename}`, id, name, author, size, lyric });
    }
    ctx.body = musicList;
  }

  async getMusicByFilename(ctx, next) {
    const { filename } = ctx.params;
    const [music] = await fileService.queryMusicList(filename);
    const result = fs.createReadStream(`./upload/music/${filename}`);
    ctx.response.set("content-type", music.mimetype);
    ctx.response.set("accept-ranges", "bytes 0-" + music.size);
    ctx.response.set("content-length", music.size);
    ctx.body = result;
  }
}

module.exports = new fileController();