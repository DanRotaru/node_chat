const app = require('express')()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const path = require('path');
const db = require('./config/db.core')

var wss;

function createWSS(callback){
    wss = new WebSocket.Server({
        server: server
    });
    if(callback) callback('done');
}

createWSS();


wss.on('connection', function(ws, req) {
    console.log(req.headers.cookie);
    // let ip = req.socket.remoteAddress.replace('::ffff:','');
    let ip = '127.0.0.1';
    console.log('A new client Connected using IP: '+ip);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        let msg1 = message.split("=:=:=");
        let login = msg1[0];
        let msg = msg1[1];
        
        db.insert('chat', {login: login, text: msg, ip: ip, date: Math.floor(Date.now() / 1000)});
        

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    db.query("SELECT * FROM chat", function(e){
        if(e.length){
            for(let el of e) {
                // console.log(el);
                let rex = `${el.login}=:=:=${el.text}=:=:=${el.date}`
                ws.send(rex);
            }
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/database', (req, res) => {
    let json;
    db.query("SELECT * FROM chat", function(e){
        json = JSON.stringify(e);
        res.send(`<h1>All Database</h1><p>${json}</p>`);
    });
    
})

server.listen(3000, () => console.log(`Lisening on port 3000`))

module.exports = {server, app, createWSS, wss};