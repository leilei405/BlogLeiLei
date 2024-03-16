const {
  loginQuestionCheck,
  registerQuestionCheck,
  getQuestionInfo,
} = require("../../controller/question/questionuser");
const { ErrorModel, SuccessModel } = require("../../model/questionResModel");

const handlerQuestionUserRouter = (req, res) => {
  const method = req.method; // GET POST

  // 登录
  if (method === "POST" && req.path === "/api/questionUser/login") {
    const { username, password } = req.body;
    const data = loginQuestionCheck(username, password);

    if (data) {
      return new SuccessModel();
    }

    return new ErrorModel("登录失败");
  }

  // 注册
  if (method === "POST" && req.path === "/api/questionUser/register") {
    const { username, password } = req.body;
    const data = registerQuestionCheck(username, password);

    if (data) {
      return new SuccessModel();
    }
    return new ErrorModel("注册失败");
  }

  // 获取用户信息
  if (method === "GET" && req.path === "/api/questionUser/userInfo") {
    const data = getQuestionInfo();
    return new SuccessModel(data);
  }
};

module.exports = handlerQuestionUserRouter;
