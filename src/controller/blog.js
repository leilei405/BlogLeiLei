// 获取博客列表
const getBlogList = (author, keyword) => {
    // 先返回假数据
    const blogList = [
        {
            id: 1,
            title: '标题1',
            content: '内容1',
            createTime: 1709370624290,
            author: 'John'
        },
        {
            id: 2,
            title: '标题2',
            content: '内容2',
            createTime: 1709370626290,
            author: 'Jack'
        },
    ];

    return blogList;
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

module.exports = {
    getBlogList,
    getBlogDetail
}