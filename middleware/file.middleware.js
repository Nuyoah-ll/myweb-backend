const path = require("path");
const Multer = require("koa-multer");
const jimp = require("jimp");

const avatarUpload = Multer({
  dest: "./upload/avatar"
})

const pictureUpload = Multer({
  dest: "./upload/picture"
})

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/music")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const musicUpload = Multer({
  storage
})

const avatarHandler = avatarUpload.single("avatar");
const pictureHandler = pictureUpload.array("pictures", 9);
const musicHandler = musicUpload.single("music");

async function pictureResize(ctx, next) {
  const files = ctx.req.files;
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then(picture => {
      picture.resize(1280, jimp.AUTO).write(`${destPath}-large`);
      picture.resize(640, jimp.AUTO).write(`${destPath}-middle`);
      picture.resize(320, jimp.AUTO).write(`${destPath}-small`);
    })
  }
  await next();
}

module.exports = {
  avatarHandler,
  pictureHandler,
  musicHandler,
  pictureResize
}