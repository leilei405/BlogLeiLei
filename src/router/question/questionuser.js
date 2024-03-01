const handlerQuestionUserRouter = (req, res) => {
    const method = req.method; // GET POST

    // 登录
    if (method === 'POST' && req.path === '/api/questionUser/login') {
        return {
            msg: '登录接口'
        }
    }

    // 注册
    if (method === 'POST' && req.path === '/api/questionUser/register') {
        return {
            msg: '注册接口'
        }
    }

    // 获取用户信息
    if (method === 'GET' && req.path === '/api/questionUser/userInfo') {
        return {
            msg: '获取用户信息'
        }
    }

}

module.exports = handlerQuestionUserRouter;