const mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_chat'
});



function createConnection(callback){
    if(conn.state == 'disconnected'){
        conn.connect(function(err) {
            if (err) throw err;
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