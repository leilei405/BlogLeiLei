const { login, registerCheck } = require('../../controller/blog/user')
const { ErrorModel, SuccessModel } = require('../../model/blogResModel');

const handlerUserRouter = (req, res) => {
    const method = req.method; // GET POST
    
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        // const { username, password } = req.query;
        const data = login(username, password);
        return data.then((user) => {
            if (user.username) {
                // 操作cookie 
                // res.setHeaders('Set-Cookie', `username=${user.username}; path=/; httpOnly`);
                return new SuccessModel();
            } 
            return new ErrorModel('登录失败');
        });
    }

    // 登录验证测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.cookie.username) {
    //         return Promise.resolve(new SuccessModel());
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'));
    // }

    // 注册add
    if (method === 'POST' && req.path === '/api/user/register') {
        const { username, password, realname, status } = req.body;
        const data = registerCheck(username, password, realname, status);
        return data.then((user) => {
            return new SuccessModel(user);
        });
    }

}

module.exports = handlerUserRouter;