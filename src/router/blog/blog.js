const { 
    getBlogList, 
    getBlogDetail 
} = require('../../controller/blog');

const { ErrorModel, SuccessModel } = require('../../model/resModel');

const handlerBlogRouter = (req, res) => {
    const method = req.method;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const list = getBlogList(author, keyword);
        return new SuccessModel(list);
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id;
        const blogDetail = getBlogDetail(id);
        return new SuccessModel(blogDetail);
    }

    // 创建博客文章
    if (method === 'POST' && req.path === '/api/blog/create') {
        return {
            msg: '创建博客文章接口'
        }
    }

    // 更新博客接口
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '更新博客文章接口'
        }
    }

    // 删除博客接口
    if (method === 'POST' && req.path === '/api/blog/delete') {
        return {
            msg: '删除博客文章接口'
        }
    }
}

module.exports = handlerBlogRouter;