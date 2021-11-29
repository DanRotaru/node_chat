
# Real time chat on NodeJS (Express + MYSQL)
Real time char collaboration on nodejs

## Used stack:
1. Express
2. WebSocket
3. MySQL

## Init
First install all dependencies
```
npm i
```

## Config database
You need to write your database details. Upload file `db.sql` in your database and in `/config/db.js` change database name, user, password..
```javascript
const Setting  = {
	host: 'localhost',
	port: 3306,
	database: 'node_chat',
	user: 'root',
	password: ''
}
```

Done. Now just run it
```
npm start
```

![image](https://user-images.githubusercontent.com/7759507/143871330-f34bbe65-e328-4d28-9622-ab0161acc561.png)


