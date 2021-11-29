var db = require('./db');

async function select(from, what, where, callback) {
    let res = await db.select(from, what, where)

    if (callback !== undefined) callback(res);
}
async function insert(msg, login, ip){
    let res = await db.insert("chat", {
        login: login,
        text: msg,
        ip: ip,
        date: Math.floor(Date.now() / 1000)
    })
}
async function update(table, what, where){
    let res = await db.update(table, what, where);
}

async function truncate(table){
    await db.query(`TRUNCATE TABLE ${table}`);
}

module.exports = {
    select: select,
    insert: insert,
    update: update,
    truncate: truncate
}