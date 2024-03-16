const env = process.env.NODE_ENV; // 获取环境变量参数
let MYSQL_CONFIG = {}; // 配置对象

// 开发环境
if (env === "dev") {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root123456",
    port: "3306",
    database: "blogquestion",
  };
}

// 生产环境
if (env === "production") {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root123456",
    port: "3306",
    database: "blogquestion",
  };
}

module.exports = {
  MYSQL_CONFIG,
};
