export default {
    up: `CREATE TABLE friends (
            id INTEGER PRIMARY KEY,
            from_user INTEGER,
            to_user INTEGER,
            message TEXT,
            accepted_at DATETIME,
            denided_at DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
    down: "DROP TABLE friends",
}