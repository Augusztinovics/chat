export default {
    up: `CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT UNIQUE,
            lg TEXT,
            country TEXT,
            city TEXT,
            description TEXT,
            profile_img BLOB,
            ip TEXT,
            device_data Text,
            remember_token TEXT UNIQUE,
            push_token TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
    down: "DROP TABLE users",
}