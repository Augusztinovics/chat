export default {
    up: `CREATE TABLE admin_users (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            role_id INTEGER,
            update_password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
    down: "DROP TABLE admin_users",
}