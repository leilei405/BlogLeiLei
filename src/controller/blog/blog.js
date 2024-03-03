const { exec } = require('../../db/mysql');

// 获取博客列表
const getBlogList = (author, keyword) => {
    // 受限定义一个sql语句
    let sql = 'select * from bloglist where 1 = 1 '

    if (author) {
        sql += `and author='${author}'`
    }

    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }

    sql += `order by createTime desc;`

    return exec(sql);
}

// 获取单个详情
const getBlogDetail = (id) => {
    const blogDetail = {
        id: 1,
        title: '标题1',
        content: '内容1',
        createTime: 1709370624290,
        author: 'John'
    }

    return blogDetail;
}

// 创建博客
const createBlogArticle = (blogData = {}) => {
    console.log(blogData, '===create===');
    return {
        id: 3,
    }
}

// 更新博客
// ?id=3&content=内容1&title=标题1&createTime=1709370626290&author=Jack
const updateBlogArticle = (id, blogData = {}) => {
    console.log(blogData, '===update===');
    return {
        id: 3,
    }
}

// 删除博客
const deleteBlogArticle = (id) => {
    console.log(id, '===delete===');
    return {
        id: 3,
    }
}

module.exports = {
    getBlogList,
    getBlogDetail,
    createBlogArticle,
    updateBlogArticle,
    deleteBlogArticle
}