const serverHandler = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-Type', 'application/json');

    // resData 
    const resData = {
        name: 'mirLiu100',
        age: 26,
        env: process.env.NODE_ENV
    }

    res.end(JSON.stringify(resData));
}

module.exports = serverHandler;