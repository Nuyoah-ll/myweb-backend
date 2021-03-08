const errorTypes = require("../constants/error-types");

function errorHandler(error, ctx) {
  let status, message;

  // error.message可以获得错误对象的错误信息
  switch (error.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;    
      message = "用户名或者密码不能为空";
      break;
    case errorTypes.FORMAT_OF_USERNAME_IS_INCORRECT:
      status = 400;  
      message = "用户名格式不正确";
      break;
    case errorTypes.FORMAT_OF_PASSWORD_IS_INCORRECT:
      status = 400;
      message = "密码格式不正确";
      break;
    case errorTypes.USERNAME_iS_ALREADY_EXIST:
      status = 409;   
      message = "用户名已存在";
      break;
    case errorTypes.USERNAME_IS_NOT_EXIST:
      status = 400;
      message = "用户名不存在";
      break;
    case errorTypes.PASSWORD_ERROR:
      status = 400;
      message = "用户名或密码错误";
      break;
    case errorTypes.UNAUTHORIZED:
      status = 401; 
      message = "无效的token";
      break;
    case errorTypes.NO_PERMISSION:
      status = 401;
      message = "权限不够";
      break;
    case errorTypes.RESOURCE_NOT_FOUND:
      status = 410;
      message = "资源已被删除";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;