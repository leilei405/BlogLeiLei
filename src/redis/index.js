const redis = require("redis");

(async function () {
  // 创建客户端
  const redisClient = redis.createClient(6379, "127.0.0.1");

  // 连接
  await redisClient
    .connect()
    .then(() => {
      console.log("success redis");
    })
    .catch((err) => {
      console.error(err, "===err==");
    });

  // set
  await redisClient.set("myUserName", "John");

  // get
  const myUserName = await redisClient.get("myUserName");
  console.log(myUserName, "===userName===");

  // 退出
  redisClient.quit();
})();
