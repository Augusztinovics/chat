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
        if (Object.hasOwn(this, this.constructor.primaryKey) && this[this.constructor.primaryKey]) {
            console.log('We have id, so update!');
        } else {
            console.log('No id, create new');
        }
    }

}

module.exports = Model;