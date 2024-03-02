const loginCheck = (username, password) => {
    // 假数据使用
    if (username === 'Jack' && password === '123456') {
        return true;
    }
    return false;
}


const registerCheck = (username, password) => {
    // 假数据使用
    if (username === 'Jack' && password === '123456') {
        return true;
    }
    return false;
}

module.exports = {
    loginCheck,
    registerCheck,
}