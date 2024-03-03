const { loginCheck, registerCheck } = require('../../controller/blog/user')
const { ErrorModel, SuccessModel } = require('../../model/blogResModel');

const handlerUserRouter = (req, res) => {
    const method = req.method; // GET POST
    
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const data = loginCheck(username, password);
        return data.then((user) => {
            if (user.username) {
                return new SuccessModel();
            } 
            return new ErrorModel('登录失败');
        });
    }

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