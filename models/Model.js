const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../database/chat.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err);
    }
});

class Model {
    static table = 'none';
    static primaryKey = 'id';
    static columns = {};

    constructor(attributes) {
        if (typeof attributes == 'object') {
            Object.entries(this.constructor.columns).forEach(([key, value]) => {
                if (Object.hasOwn(attributes, key)) {
                    this[key] = attributes[key]
                } else {
                    this[key] = value;
                }
            });
        } else {
            Object.entries(this.constructor.columns).forEach(([key, value]) => {
                this[key] = value;
            });
        }
    }

    save() {
        return new Promise((resolve) => {
            let updateMod = false;
            if (Object.hasOwn(this, this.constructor.primaryKey) && this[this.constructor.primaryKey]) {
                updateMod = true;
            }

            let insertKeys = [];
            let insertValues = [];
            let placeholders = [];

            Object.entries(this.constructor.columns).forEach(([key, value]) => {
                if (key !== this.constructor.primaryKey && key !== 'created_at') {
                    if (updateMod) {
                        insertKeys.push(`${key}=?`);
                        insertValues.push(this[key]);
                    } else {
                        insertKeys.push(key);
                        insertValues.push(this[key]);
                        placeholders.push('?');
                    }
                }
            });
            let query;
            if (updateMod) {
                query = `UPDATE ${this.constructor.table} SET ${insertKeys.join(', ')} WHERE ${this.constructor.primaryKey}=${this[this.constructor.primaryKey]}`;
            } else {
                query = `INSERT INTO ${this.constructor.table} (${insertKeys.join(', ')}) VALUES (${placeholders.join(', ')})`;
            }

            db.run(query, insertValues, (err) => {
                if (err) {
                    resolve(false);
                } else {
                    //TODO If it was create need id to put on model!!!
                    resolve(true);
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
            let query = `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?`
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
     * condition can be flat array: [culomn_name, operator?(=), value] example: ['id', '=', 1] or ['id', 1] - result query: WHERE id = 1
     * 
     * Or can be array of array: [[culomn_name, operator?(=), value], [culomn_name, operator?(=), value]] example: [['username', 'LIKE', 'test%'], ['created_at', '<=', "2025-12-11"]] result: WHERE 'username' LIKE 'test%' AND created_at<= "2025-12-11"
     * 
     * possible values for limit: 'first', 'all'
     * 
     * @param {string[]} condition 
     * @param {string} limit 
     * @returns class | class[] | null
     */
    static where(condition, limit='all') {
        return new Promise((resolve, reject) => {
            if (typeof condition !== 'object') {
                throw 'Invalid argument, condition not an array';
            }
            if (!condition.length) {
                throw 'Invalid argument, condition has no length';
            }
            let query = `SELECT * FROM ${this.table} WHERE `;
            let values = [];
            if (typeof condition[0] == 'object') {
                let conditions = [];
                condition.forEach(element => {
                    if (element.length == 2) {
                        conditions.push(`${element[0]} = ?`);
                        values.push(element[1]);
                    } else if(element.length == 3) {
                        conditions.push(`${element[0]} ${element[1]} ?`);
                        values.push(element[2]);
                    }
                });
                if (conditions.length) {
                    query += conditions.join(' AND ');
                } else {
                    throw 'Invalid argument, condition has unsuported length';
                }
            } else {
                if (condition.length == 2) {
                    query += `${condition[0]} = ?`;
                    values.push(condition[1]);
                } else if(condition.length == 3) {
                    query += `${condition[0]} ${condition[1]} ?`;
                    values.push(condition[2]);
                } else {
                    throw 'Invalid argument, condition has unsuported length';
                }
            }
            if (limit.toLowerCase() == 'first') {
                try {
                    db.get(query, values, (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (row && Object.keys(row).length) {
                                resolve(new this(row));
                            } else {
                                resolve(null);
                            }
                        }
                    });
                } catch (error) {
                    reject(err);
                }
            } else {
                try {
                    db.all(query, values, (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (rows.length) {
                                let result = [];
                                rows.forEach(row => {
                                    result.push(new this(row))
                                })
                                resolve(result);
                            } else {
                                resolve(null);
                            }
                        }
                    });
                } catch (error) {
                    reject(err);
                }
            }
        });
    }

    /**
     * Can be any WHERE query (the query will start "SELECT * FROM ${table} WHERE ")
     * 
     * @param {string} query 
     * @param {any[]} values 
     * @returns object[]
     */
    static whereRaw(query, values=[]) {
        return new Promise((resolve, reject) => {
            let holeQuery = `SELECT * FROM ${this.table} WHERE ${query}`
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

    static create(data) {
        let culomns = [];
        let placeholder = [];
        let values = [];
        if (typeof data === 'object') {
            Object.entries(this.columns).forEach(([key, value]) => {
                if (key !== this.primaryKey && key !== 'created_at') {
                    culomns.push(key);
                    placeholder.push('?');
                    if (Object.hasOwn(data, key)) {
                        values.push(data[key]);
                    } else {
                        values.push(value);
                    }
                }
            });
        } else {
            Object.entries(this.columns).forEach(([key, value]) => {
                if (key !== this.primaryKey && key !== 'created_at') {
                    culomns.push(key);
                    values.push(value);
                    placeholder.push('?');
                }
            });
        }

        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ${this.table} (${culomns.join(', ')}) VALUES (${placeholder.join(', ')})`;
            new Promise((resolve,reject) => {
                try {
                    db.run(query, values, function (err) {
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
                let query = `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?`
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

    /**
     * Delete the model by id
     *
     * @param {bigint} id
     * @returns Boolean
     */
    static delete(id) {
        return new Promise((resolve) => {
            let query = `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`;
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

    /**
     * The query start with SELECT 
     *
     * @param {string} query
     * @param {array} values
     * @returns array
     */
    static returnMany(query, values=[]) {
        return new Promise((resolve) => {
            try {
                db.all('SELECT ' + query, values,  (err, rows) => {
                    if (err) {
                        resolve([]);
                    } else {
                        resolve(rows)
                    }
                });
            } catch (error) {
                console.log(error);
                resolve([]);
            }
        });
    }

}

module.exports = Model;