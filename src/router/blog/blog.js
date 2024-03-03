const { 
    getBlogList,
    getBlogDetail,
    createBlogArticle,
    updateBlogArticle,
    deleteBlogArticle,
} = require('../../controller/blog/blog');

const { ErrorModel, SuccessModel } = require('../../model/blogResModel');

const handlerBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = getBlogList(author, keyword);
        return result.then(res => {
            return new SuccessModel(res, '获取成功');
        }) 
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const blogDetailResult = getBlogDetail(id);
        return blogDetailResult.then(res => {
            return new SuccessModel(res);
        });
    }

    // 创建博客文章
    if (method === 'POST' && req.path === '/api/blog/create') {
        const result = createBlogArticle(req.body);
        return result.then(res => {
            return new SuccessModel(res);
        });   
    }

    // 更新博客接口
    if (method === 'POST' && req.path === '/api/blog/update') {
        const  data = updateBlogArticle(id, req.body);
        return data.then(res => {
            if (res) {
                return new SuccessModel(data);
            } else {
                return new ErrorModel('更新失败')
            }
        });
    }

    // 删除博客接口
    if (method === 'POST' && req.path === '/api/blog/delete') {

        const data = deleteBlogArticle(id, 'Jack');
        return data.then(res => {
            if (res) {
                return new SuccessModel(data);
            } else {
                return new ErrorModel('删除失败')
            }
        });
        
    }
}

module.exports = handlerBlogRouter;