require('dotenv').config()

const mysqlHost = process.env.MYSQL_HOST || 'localhost'
const mysqlPort = process.env.MYSQL_PORT || '3306'
const mysqlUser = process.env.MYSQL_USER || 'root'
const mysqlPass = process.env.MYSQL_PASS || 'root'
const mysqlDB   = process.env.MYSQL_DB   || 'node_chat'

const mysql = require('mysql');
var conn = mysql.createConnection({
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPass,
    database: mysqlDB,
    port: mysqlPort
});



function createConnection(callback){
    if(conn.state == 'disconnected'){
        conn.connect(function(err) {
            if (err){
                console.log('\x1b[36m%s\x1b[0m', 'Error connecting to db! Errno: '+err.errno);
                console.log('------------------------------');
                console.log(`MYSQL_HOST=${mysqlHost}\nMYSQL_DB=${mysqlDB}\nMYSQL_USER=${mysqlUser}\nMYSQL_PASS=${mysqlPass}\nMYSQL_PORT=${mysqlPort}`);
                console.log('------------------------------');
                throw err;
            };
            if(callback) callback(true);
            
        }); 
    }
    else{
        if(callback) callback(true);
    }
    
}

createConnection();

function getMessages(callback){
    conn.query("SELECT count(id) as c FROM chat", function (error, results, fields) {
        if(callback) callback(results[0].c);
    });
}

module.exports = {conn, createConnection, getMessages}