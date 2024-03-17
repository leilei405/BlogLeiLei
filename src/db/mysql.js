const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db"); // 引入数据库配置

// 创建连接对象
const connecTion = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connecTion.connect();

// 封装统一执行sql的函数
const exec = (sql) => {
  const promise = new Promise((resolve, reject) => {
    connecTion.query(sql, (err, data) => {
      if (err) {
        console.log(err, "===err===");
        reject(err);
        return;
      }
      if (data) {
        resolve(data);
      }
    });
  });
  return promise;
};

module.exports = {
  exec,
};
