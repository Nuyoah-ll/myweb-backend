const KoaRouter = require("koa-router");
const { getAvatarInfoById, getAvatarInfoByFilename, getHistoryAvatars } = require("../controller/user.controller");

const userRouter = new KoaRouter({ prefix: "/user" });

userRouter.get("/:userId/avatar", getAvatarInfoById);
userRouter.get("/avatar/:filename", getAvatarInfoByFilename);
userRouter.get("/:userId/history/avatar", getHistoryAvatars);

module.exports = userRouter;