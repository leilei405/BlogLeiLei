const handlerQuestionManagerRouter = (req, res) => {
    const method = req.method; // GET POST

    // 获取问卷列表 (全部)
    if (method === 'GET' && req.path === '/api/question/list') {
        return {
            msg: '获取问卷列表 (全部)'
        }
    }

    // 获取单个问卷信息
    if (method === 'GET' && req.path === '/api/question/detailQuestion') {
        return {
            msg: '获取单个问卷信息接口'
        }
    }

    // 创建问卷调查
    if (method === 'POST' && req.path === '/api/question/createQuestion') {
        return {
            msg: '创建问卷调查'
        }
    }

    // 复制问卷调查
    if (method === 'POST' && req.path === '/api/question/copyQuestion') {
        return {
            msg: '复制问卷调查'
        }
    }

    // 更新问卷调查
    if (method === 'POST' && req.path === '/api/question/updateQuestion') {
        return {
            msg: '更新问卷调查'
        }
    }

    // 删除问卷调查
    if (method === 'POST' && req.path === '/api/question/deleteQuestion') {
        return {
            msg: '删除问卷调查'
        }
    }

}

module.exports = handlerQuestionManagerRouter;