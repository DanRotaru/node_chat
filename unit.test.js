const {
    conn,
    createConnection,
    getMessages
} = require('./config/db')

const request = require("supertest");
const app = require("./index");

test("GET / method statusCode should be 200", done => {
    request(app.app)
    .get("/")
    .then(response => {
        expect(response.statusCode).toBe(200);
        done();
    });
});

test("GET /database statusCode should be 200", done => {
    request(app.app)
    .get("/database")
    .then(response => {
        expect(response.statusCode).toBe(200);
        done();
    });
});

test('Start Web Socket Server', done => {
    function callback(data) {
        expect(data).toBe('done');
        done();
    }

    app.createWSS(callback);
});

test('Check if database is connected', done => {
    function callback(data) {
        expect(data).toBe(true);
        done();
    }

    createConnection(callback);
});


test('Max 100 chat messages', done => {
    function callback(data) {
        expect(data).toBeLessThan(100);
        done();
    }

    getMessages(callback);
});

afterAll(() => {
    conn.end();
    app.server.close();
});