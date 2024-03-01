const handlerBlogRouter = require('./src/router/blog/blog') // 博客文章
const handlerUserRouter = require('./src/router/blog/user') // 博客用户信息

const handlerQuestionUserRouter = require('./src/router/question/questionuser') // 问卷用户信息
const handlerQuestionManagerRouter = require('./src/router/question/questionmanage') // 问卷调查信息

const serverHandler = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-Type', 'application/json');

    // 获取path
    const url = req.url
    req.path = url.split('?')[0];

    // 处理博客路由
    const blogData = handlerBlogRouter(req, res);
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }


    // 处理用户信息路由
    const userData = handlerUserRouter(req, res);
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }
    

    // 处理问卷用户信息
    const questionInfoData = handlerQuestionUserRouter(req, res);
    if (questionInfoData) {
        res.end(JSON.stringify(questionInfoData))
        return
    }

    // 处理问卷调查信息

    const questionManageData = handlerQuestionManagerRouter(req, res);
    if (questionManageData) {
        res.end(JSON.stringify(questionManageData))
        return
    }

    // 未命中路由
    res.writeHead(404, {"Content-Type": 'text/plain'})
    res.write('404 Not Found\n');
    res.end();
}

module.exports = serverHandler;