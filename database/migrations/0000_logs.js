export default {
    db: 'chat_log.db',
    up: "CREATE TABLE logs (id INTEGER PRIMARY KEY,level TEXT DEFAULT 'INFO',log TEXT,created_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
    down: "DROP TABLE logs",
}