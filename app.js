const querystring = require("querystring");
const handlerBlogRouter = require("./src/router/blog/blog"); // 博客文章
const handlerUserRouter = require("./src/router/blog/user"); // 博客用户信息
const handlerQuestionUserRouter = require("./src/router/question/questionuser"); // 问卷用户信息
const handlerQuestionManagerRouter = require("./src/router/question/questionmanage"); // 问卷调查信息
const { get, set } = require("./src/db/redis");
const { access } = require("./src/utils/log"); // 日志

// session 数据
// const SESSION_DATA = {};

// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log(d.toGMTString(), "====d.toGMTString()===");
  return d.toGMTString();
};

// 用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });
  });

  return promise;
};

const serverHandler = (req, res) => {
  // access log
  const { method, url: urls, headers } = req || {};
  access(`${method}--${urls}--${headers["user-agent"]}${Date.now()}`);

  // 设置返回格式 JSON
  res.setHeader("Content-Type", "application/json");

  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ""; // 键值对数据格式'name=fll;age=18'
  cookieStr.split(";").forEach((item) => {
    if (!item) return;
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });

  // 解析session
  //   let needSetCookie = false;
  //   let userId = req.cookie.userId;
  //   if (userId) {
  //     if (!SESSION_DATA[userId]) {
  //       SESSION_DATA[userId] = {};
  //     }
  //   } else {
  //     needSetCookie = true;
  //     userId = `${Date.now()}_${Math.random()}`;
  //     SESSION_DATA[userId] = {};
  //   }
  //   req.session = SESSION_DATA[userId];

  // 使用redis解析session
  let needSetCookie = false;
  let userId = req.cookie.userId;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化session
    set(userId, {});
  }
  // 获取session
  req.sessionId = userId;
  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData == null) {
        // 初始化redis中的session值
        set(req.sessionId, {});
        // 设置session
        req.session = {};
      } else {
        // 设置session
        req.session = sessionData;
      }
      console.log(req.session, "====req.session===");

      // 处理post Data
      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;

      // 处理博客路由
      const blogResult = handlerBlogRouter(req, res);
      if (blogResult) {
        blogResult.then((result) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}` // httpOnly
            );
          }
          res.end(JSON.stringify(result));
        });
        return;
      }

      // 处理用户信息路由
      const userResult = handlerUserRouter(req, res);
      if (userResult) {
        userResult.then((result) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}` // httpOnly
            );
          }
          res.end(JSON.stringify(result));
        });
        return;
      }

      // 处理问卷用户信息
      const questionInfoData = handlerQuestionUserRouter(req, res);
      if (questionInfoData) {
        res.end(JSON.stringify(questionInfoData));
        return;
      }

      // 处理问卷调查信息
      const questionManageData = handlerQuestionManagerRouter(req, res);
      if (questionManageData) {
        res.end(JSON.stringify(questionManageData));
        return;
      }

      // 未命中路由
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found\n");
      res.end();
    });
};

module.exports = serverHandler;
