const migrations = require('./migrations');
const sqlite3 = require('sqlite3').verbose();

let index = 0;
let files = [];

Object.keys(migrations).forEach(k => {
    files.push(k);
})

let filesLength = files.length;
let rollingBack = false;

async function migrateFile(file) {
    return new Promise((resolve, reject) => {
        let data = migrations[file].default;
        let db;
        let path = __dirname + '/';
        let conection = new Promise((resolve, reject) => {
            if (data.db) {
                path += data.db;
                console.log(path);
                db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(true);
                    }
                });
            } else {
                path += 'chat.db';
                db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(true);
                    }
                });
            }
        });
        conection.then(() => {
            let queryResult = new Promise((resolve, reject) => {
                let query = data.up;
                if (rollingBack) {
                    query = data.down;
                }
                if (!query) {
                    reject({errno: -1});
                    return;
                }
                db.run(query, (err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(true);
                    }
                });
            });
            queryResult.then(() => {
                index++;
                console.log(file + ' migrated...');
                resolve(true);
            })
            .catch((err) => {
                if (err.errno == 1) {
                    console.log(file + ' already migrated, skiping...');
                    index++;
                    resolve(true);
                } else if (err.errno == -1) {
                    console.log('Missing query in file: ' + file + '. Skipping this migration!');
                    index++;
                    resolve(true);
                } else {
                    reject(err);
                }
            });
        })
        .catch((e) => {
            reject(e);
        })
    });
}

function migrate(rollback = false, filename = null) {
    if (rollback) {
        rollingBack = true;
        files.reverse();
    }
    if (filename) {
        if (files.indexOf(filename) > -1) {
            migrateFile(filename)
            .then(() => {
                console.log('Migration for file: ' + filename + ' done');
            })
            .catch((e) => {
                console.log('Failed to migrate file: ' + filename);
                console.log(e);
            })
        } else {
            console.log('Cant find the migration file: ' + filename);
        }
    } else if (index < filesLength) {
        migrateFile(files[index])
        .then(() => {
            migrate();
        })
        .catch((e) => {
            console.log('Migrate Function Catch!');
            console.log(e);
        })
    } else {
        console.log('Migration finished!');
    }
}

module.exports = migrate;
