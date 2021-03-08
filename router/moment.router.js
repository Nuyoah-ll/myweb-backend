const KoaRouter = require("koa-router");

const {
  verifyAuth,
  verifyPermission
} = require("../middleware/auth.middleware");

const {
  createMoment,
  getMomentDetail,
  getMomentList,
  updateMoment,
  deleteMoment,
  getMomentPicture
} = require("../controller/moment.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 创建动态
momentRouter.post("/", verifyAuth, createMoment);
// 通过momentId来获取动态
momentRouter.get("/:momentId", getMomentDetail);
// 通过查询字符串offset和size来进行分页查询动态
momentRouter.get("/", getMomentList);
// 需要验证用户是否登录，还要验证用户是否有权限更改动态，然后才能更改动态
// 修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, updateMoment);
// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, deleteMoment);
// 获取动态图片
momentRouter.get("/pictures/:filename",getMomentPicture);

module.exports = momentRouter;