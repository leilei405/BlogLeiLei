const { loginCheck, registerCheck } = require('../../controller/blog/user')
const { ErrorModel, SuccessModel } = require('../../model/blogResModel');


const handlerUserRouter = (req, res) => {
    const method = req.method; // GET POST
    
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const data = loginCheck(username, password);

        if (data) {
            return new SuccessModel
        } 

        return new ErrorModel('登录失败');
    }

    // 注册
    if (method === 'POST' && req.path === '/api/user/register') {
        const { username, password } = req.body;
        const data = registerCheck(username, password);

        if (data) {
            return new SuccessModel
        } 
         return new ErrorModel('注册失败');
    }

}

module.exports = handlerUserRouter;