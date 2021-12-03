var {conn} = require('./db');

function query(query, callback){
    conn.query(query, function (error, results, fields) {
        if(callback) callback(results);
        else return results;
    });
}

function insert(where, what, callback){
    var query = conn.query('INSERT INTO '+where+' SET ?', what, function (error, results, fields) {
    if (error) throw error;
        if(callback) callback(fields);
        else return fields;
    });
}


module.exports = {
    query: query,
    insert: insert
}