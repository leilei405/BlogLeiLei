const {
    getQuestionAllList,
    getQuestionDetail,
    createQuestion,
    deleteQuestion,
    updateQuestion,
    copyQuestion
} = require('../../controller/question/questionmanage');

const { ErrorModel, SuccessModel } = require('../../model/questionResModel');

const handlerQuestionManagerRouter = (req, res) => {
    const method = req.method; // GET POST
    const id = req.query.id;

    // 获取问卷列表 (全部)
    if (method === 'GET' && req.path === '/api/question/list') {
        const keyword = req.query.keyword || '';
        const list = getQuestionAllList(keyword);
        return new SuccessModel(list)
    }

    // 获取单个问卷信息
    if (method === 'GET' && req.path === '/api/question/detailQuestion') {
        const data = getQuestionDetail(id);
        return new SuccessModel(data);
    }

    // 创建问卷调查
    if (method === 'POST' && req.path === '/api/question/createQuestion') {
        const data = createQuestion(req.body);
        return new SuccessModel(data);
    }

    // 复制问卷调查
    if (method === 'POST' && req.path === '/api/question/copyQuestion') {
        const data = copyQuestion(id);
        return new SuccessModel(data)
    }

    // 更新问卷调查
    if (method === 'POST' && req.path === '/api/question/updateQuestion') {
        const data = updateQuestion(id, req.body);
        return new SuccessModel(data);
    }

    // 删除问卷调查
    if (method === 'POST' && req.path === '/api/question/deleteQuestion') {
        const data = deleteQuestion(id);
        return new SuccessModel(data);
    }

}

module.exports = handlerQuestionManagerRouter;