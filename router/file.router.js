const KoaRouter = require("koa-router");


const {
  verifyAuth, verifyPermission
} = require("../middleware/auth.middleware");

const {
  avatarHandler,
  pictureHandler,
  musicHandler,
  pictureResize
} = require("../middleware/file.middleware");

const {
  saveAvatarInfo,
  savePictureInfo,
  saveMusicInfo,
  getMusicList,
  getMusicByFilename,
} = require("../controller/file.controller");

const fileRouter = new KoaRouter({ prefix: "/upload" });

// 上传头像的接口
fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);


fileRouter.post("/picture/:momentId", verifyAuth, verifyPermission, pictureHandler, pictureResize, savePictureInfo);


// 上传音乐的接口
fileRouter.post("/music", verifyAuth, musicHandler, saveMusicInfo);
// 获取音乐接口
fileRouter.get("/music/list", getMusicList);
// 根据音乐名称返回实际的音乐文件
fileRouter.get("/music/:filename", getMusicByFilename);

module.exports = fileRouter;