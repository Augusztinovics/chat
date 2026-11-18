export default {
    up: `CREATE TABLE questions (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            title TEXT,
            question TEXT,
            answer TEXT,
            answered_at DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
    down: "DROP TABLE questions",
}