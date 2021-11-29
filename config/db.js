const Medoo = require('medoo.js');
const Setting = {
    host: 'localhost',
    port: 3306,
    database: 'node_chat',
    user: 'root',
    password: ''
}

var db;

async function createConnection() {
    db = new Medoo(Setting);
    await db.setup();
}

createConnection()

module.exports = db;