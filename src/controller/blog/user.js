const { exec } = require('../../db/mysql');
const login = (username, password) => {
    // 假数据使用
    let sql = `select username, realname from bloguser where username='${username}' and password='${password}'`
    return exec(sql).then((rows) => {
        return rows[0] || {};
    });
}


const registerCheck = (username, password, realname, status) => {
    let sql = `insert into bloguser (username, password, realname, status) values('${username}', '${password}', '${realname}', '${status}')`
    return exec(sql).then((res) =>{
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

module.exports = {
    login,
    registerCheck,
}