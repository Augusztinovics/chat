export default {
    db: 'chat_messages.db',
    up: `CREATE TABLE messages (
            id INTEGER PRIMARY KEY,
            group_id INTEGER,
            from_id INTEGER,
            sender TEXT,
            send_time DATETIME,
            msg TEXT,
            img BLOB,
            reaction TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
    down: "DROP TABLE messages",
}