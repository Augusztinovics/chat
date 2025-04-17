export default {
    up: `CREATE TABLE groups (
            id INTEGER PRIMARY KEY,
            main_user INTEGER,
            group_name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
    down: "DROP TABLE groups",
}