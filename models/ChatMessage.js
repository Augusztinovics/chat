const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../database/chat_messages.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err);
    }
});

class ChatMessage {
    constructor() {}

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
        let orderedData = [data.group_id, data.from_id, data.sender, data.send_time, data.msg ?? null, data.img ?? null, data.reaction ?? null];
        try {
            db.run("INSERT INTO messages (group_id, from_id, sender, send_time, msg, img, reaction) VALUES (?, ?, ?, ?, ?, ?, ?)", orderedData);
        } catch (error) {
            console.log(error);
        }
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
}

module.exports = ChatMessage;