const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../database/chat_log.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err);
    }
});

class Log {
    constructor(attributes) {
        if (typeof attributes == 'object') {
            Object.entries(attributes).forEach(([key, value]) => {
                this[key] = value;
            });
        }
    }

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

    /**
     * Can be any WHERE query (the query will start "SELECT * FROM logs WHERE ")
     * 
     * @param {string} query 
     * @param {any[]} values 
     * @returns object[]
     */
    static whereRaw(query, values=[]) {
        return new Promise((resolve, reject) => {
            let holeQuery = `SELECT * FROM logs WHERE ${query}`
            try {
                db.all(holeQuery, values, (err, rows) => {
                    if (err) {
                        if (rows.length) {
                            let result = [];
                            rows.forEach(row => {
                                result.push(new this(row))
                            })
                            resolve(result);
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(rows);
                    }
                });
            } catch (error) {
                reject(err);
            }
        });
    }

    /**
     * count of entries, possible where querie start SELECT Count(*) FROM logs
     *
     * @param {string} where 
     * @param {any[]} values
     * @returns Integer
     */
    static countRaw(where = '', values=[]) {
        return new Promise((resolve) => {
            let query = `SELECT Count(*) AS num FROM logs`;
            if (where) {
                query += ' ' + where;
            }
            try {
                db.get(query, values, (err, row) => {
                    if (err) {
                        console.log(err);
                        resolve(0);
                    } else {
                        resolve(row.num);
                    }
                })
            } catch (error) {
                console.log(error);
                resolve(0);
            }
        });
    }

    /**
     * Delete the model by id
     *
     * @param {bigint} id
     * @returns Boolean
     */
    static delete(id) {
        return new Promise((resolve) => {
            let query = `DELETE FROM logs WHERE id = ?`;
            try {
                db.run(query, [id], (err) => {
                    if (err) {
                        console.log(err);
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                })
            } catch (error) {
                console.log(error);
                resolve(false);
            }
        });
    }
}

module.exports = Log;