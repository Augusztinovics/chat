export default {
    up: `CREATE TABLE group_users (
            id INTEGER PRIMARY KEY,
            group_id INTEGER,
            user_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
    down: "DROP TABLE group_users",
}