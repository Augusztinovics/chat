const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../database/chat_log.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err);
    }
});

class Log {
    constructor() {}

    static info(message) {
        db.run("INSERT INTO logs (log) VALUES (?)", [message]);
    }

    static warning(message) {
        db.run("INSERT INTO logs (level, log) VALUES (?, ?)", ['WARNING', message]);
    }

    static error(message) {
        db.run("INSERT INTO logs (level, log) VALUES (?, ?)", ['ERROR', message]);
    }

    static critical(message) {
        db.run("INSERT INTO logs (level, log) VALUES (?, ?)", ['CRITICAL', message]);
    }

    static getAllLogs() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM logs", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }) 
    }
}

module.exports = Log;