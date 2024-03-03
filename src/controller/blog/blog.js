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
    let sql = `select * from bloglist where id='${id}'`
    return exec(sql).then(res => {
        return res[0];
    })
}

// 创建博客
const createBlogArticle = (blogData = {}) => {
    console.log(blogData, '===create===');
    const { title, content, author } = blogData;
    const createTime = Date.now();

    let sql = `insert into bloglist (title, content, createTime, author) values ('${title}', '${content}', ${createTime}, '${author}')`

    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

// 更新博客
// ?id=3&content=内容1&title=标题1&createTime=1709370626290&author=Jack
const updateBlogArticle = (id, blogData = {}) => {
    const { title, content } = blogData;
    let sql = `update bloglist set title='${title}', content='${content}' where id=${id} ;`
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

// 删除博客
const deleteBlogArticle = (id, author) => {
    let sql = `delete from bloglist where id=${id} and author='${author}';`
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

module.exports = {
    getBlogList,
    getBlogDetail,
    createBlogArticle,
    updateBlogArticle,
    deleteBlogArticle
}