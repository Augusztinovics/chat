const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../database/chat_messages.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err);
    }
});

class ChatMessage {
    constructor(attributes) {
        if (typeof attributes == 'object') {
            Object.entries(attributes).forEach(([key, value]) => {
                this[key] = value;
            });
        }
    }

    static getMsgSet(groupId, set = 1) {
        return new Promise((resolve) => {
            if (!groupId) {
                resolve([]);
            }
            let query = "SELECT * FROM messages WHERE group_id = ? ORDER BY send_time DESC LIMIT 10";
            if (set > 1) {
                let offset = parseInt(set) * 10 - 10;
                query += ` OFFSET ${offset}`;
            }
            try {
                db.all(query, [groupId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        resolve([]);
                    } else {
                        resolve(rows);
                    }
                });
            } catch (error) {
                console.log(error);
                resolve([]);
            }
        });
    }

    static create(data) {
        if (!data.group_id || !data.from_id || !data.send_time) {
            console.log('Try To create message without required data: ');
            console.log(data);
            return;
        }

        return new Promise((resolve, reject) => {
            new Promise((resolve,reject) => {
                try {
                    let orderedData = [data.group_id, data.from_id, data.sender, data.send_time, data.msg ?? null, data.img ?? null, data.reaction ?? null];
                    db.run("INSERT INTO messages (group_id, from_id, sender, send_time, msg, img, reaction) VALUES (?, ?, ?, ?, ?, ?, ?)", orderedData, function (err) {
                        if (err) {
                            reject(false);
                        } else {
                            resolve(this.lastID);
                        }
                    });
                } catch (error) {
                    reject(false);
                }
                
            }).then((id) => {
                let query = `SELECT * FROM messages WHERE id = ?`
                try {
                    db.get(query, [id], (err, row) => {
                        if (err) {
                            reject(false);
                        } else {
                            if (row && Object.keys(row).length) {
                                resolve(new this(row));
                            } else {
                                resolve(null);
                            }
                        }
                    });
                } catch (error) {
                    reject(false);
                }
            }).catch((er) => {
                reject(er);
            })
        });
    }

    static getAll() {
         return new Promise((resolve, reject) => {
            db.all("SELECT * FROM messages", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }) 
    }

    /**
     * 
     * @param {bigint} id 
     * @returns class | null | false
     */
    static find(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM messages WHERE id = ?`
            try {
                db.get(query, [id], (err, row) => {
                    if (err) {
                        reject(false);
                    } else {
                        if (row && Object.keys(row).length) {
                            resolve(new this(row));
                        } else {
                            resolve(null);
                        }
                    }
                });
            } catch (error) {
                reject(false);
            }
        });
    }

    /**
     * Can be any WHERE query (the query will start "SELECT * FROM messages WHERE ")
     * 
     * @param {string} query 
     * @param {any[]} values 
     * @returns object[]
     */
    static whereRaw(query, values=[]) {
        return new Promise((resolve, reject) => {
            let holeQuery = `SELECT * FROM messages WHERE ${query}`
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
     * count of entries, possible where querie start SELECT Count(*) FROM messages
     *
     * @param {string} where 
     * @param {any[]} values
     * @returns Integer
     */
    static countRaw(where = '', values=[]) {
        return new Promise((resolve) => {
            let query = `SELECT Count(*) AS num FROM messages`;
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
            let query = `DELETE FROM messages WHERE id = ?`;
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

    static updateById(id, data) {
        return new Promise((resolve) => {
            if (typeof data == 'object') {
                let updateKeys = [];
                let updateValues = [];
                Object.entries(data).forEach(([key, value]) => {
                    updateKeys.push(`${key}=?`);
                    updateValues.push(value);
                });
                let query = `UPDATE messages SET ${updateKeys.join(', ')} WHERE id=${id}`;
                try {
                    db.run(query, updateValues, (err) => {
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
            } else {
                resolve(false);
            }
        });
    }
}

module.exports = ChatMessage;