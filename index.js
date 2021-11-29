const app = require('express')()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const path = require('path');
const db = require('./config/db.core')

const wss = new WebSocket.Server({
    server: server
});


wss.on('connection', function(ws, req) {
    console.log(req.headers.cookie);
    let ip = req.socket.remoteAddress.replace('::ffff:','');
    console.log('A new client Connected using IP: '+ip);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        let msg1 = message.split("=:=:=");
        let login = msg1[0];
        let msg = msg1[1];
        
        db.insert(msg, login, ip)

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    db.select("chat", '*', '', function(e){
        if(e.length){
            for(let el of e) {
                console.log(el);
                let rex = `${el.login}=:=:=${el.text}=:=:=${el.date}`
                ws.send(rex);
            }
        }
    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

server.listen(3000, () => console.log(`Lisening on port 3000`))