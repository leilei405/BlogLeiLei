const { login, registerCheck } = require("../../controller/blog/user");
const { ErrorModel, SuccessModel } = require("../../model/blogResModel");

// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log(d.toGMTString(), "====d.toGMTString()===");
  return d.toGMTString();
};

const handlerUserRouter = (req, res) => {
  const method = req.method; // GET POST

  // 登录
  if (method === "GET" && req.path === "/api/user/login") {
    // const { username, password } = req.body;
    const { username, password } = req.query;
    const data = login(username, password);
    return data.then((user) => {
      if (user.username) {
        // 操作cookie
        res.setHeader(
          "Set-Cookie",
          `username=${
            user.username
          }; path=/; httpOnly; expires=${getCookieExpires()}` // httpOnly
        );
        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }

  // 登录验证测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.cookie.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.cookie.username,
        })
      );
    }
    return Promise.resolve(new ErrorModel("尚未登录"));
  }

  // 注册add
  if (method === "POST" && req.path === "/api/user/register") {
    const { username, password, realname, status } = req.body;
    const data = registerCheck(username, password, realname, status);
    return data.then((user) => {
      return new SuccessModel(user);
    });
  }
};

module.exports = handlerUserRouter;
